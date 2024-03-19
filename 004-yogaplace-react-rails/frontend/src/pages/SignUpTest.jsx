import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  const handleNameChange = event => setName(event.target.value);

  const handleAgeChange = event => setAge(event.target.value);

  const handleImageChange = event => setImage(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('image', image);

    try {
      const response = await fetch('/dogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        setSubmittedData([...submittedData, data]);
        setName('');
        setAge('');
        setImage(null);
      } else {
        console.log('Failed to save record.');
      }
    } catch (error) {
      console.log('Error occurred while saving the record:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <h2>Submitted Data:</h2>
      {submittedData.map(data => (
        <div key={data.id}>
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <img src={data.image_url} alt="Uploaded" width="200" />
          <hr />
        </div>
      ))}
    </div>
  );
}
