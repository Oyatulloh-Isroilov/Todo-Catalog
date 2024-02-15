import React, { useState, useRef, useEffect } from 'react';

function Input({ onAdd, selectedCategory }) {
  const inputRef = useRef(null);

  function handleClick() {
    const newItem = inputRef.current.value.trim();
    if (newItem !== "") {
      onAdd(newItem, selectedCategory);
      inputRef.current.value = "";
    } else {
      alert("Bo'sh qatorni qo'shish mumkin emas!");
    }
  }

  return (
    <>
      <div className="container">
        <input ref={inputRef} className='input' type="text" maxLength={55} placeholder={`${selectedCategory} kategoriyasiga ma'lumot`} />
        <button className='add' onClick={handleClick}>Todo add</button>
      </div>
    </>
  );
}

function App() {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  function handleAdd(newItem, category) {
    const isDuplicate = data.some(item => item.item === newItem && item.category === category);

    if (isDuplicate) {
      alert("Bu ma'lumot avval kiritilgan");
      return;
    }

    setData(prevData => [...prevData, { item: newItem, category: category }]);
  }

  function handleDelete(index) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  return (
    <>
      <div className="container">
        <div className="categoryMenu">
          <div className="categoryTexts">
            <h2 className='category' onClick={() => setSelectedCategory("All")}>All</h2>
            <h2 className='category' onClick={() => setSelectedCategory("Groceries")}>Groceries</h2>
            <h2 className='category' onClick={() => setSelectedCategory("College")}>College</h2>
            <h2 className='category' onClick={() => setSelectedCategory("Payments")}>Payments</h2>
          </div>
        </div>

        <div className="main">
          <h1 className='allTasks'>All Tasks</h1>
          <Input onAdd={handleAdd} selectedCategory={selectedCategory} />
          <ul>
            {data.map((el, index) => {
              if (selectedCategory === "All" || el.category === selectedCategory) {
                return (
                  <li key={index}>
                    {el.item}
                    <span className='categoryInfo'>{el.category}</span>
                    <img className='delete' src="./delete.svg" alt="delete" onClick={() => handleDelete(index)} />
                  </li>
                )
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
