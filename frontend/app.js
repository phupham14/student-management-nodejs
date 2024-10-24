const apiUrl = 'http://localhost:8000/api/students';

// Hiển thị danh sách sinh viên
async function fetchStudents() {
  const response = await fetch(apiUrl);
  const students = await response.json();
  const studentList = document.getElementById('student-list');
  studentList.innerHTML = '';

  students.forEach(student => {
    const li = document.createElement('li');
    li.textContent = `${student.name}, ${student.age}, ${student.major}`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xóa';
    deleteBtn.onclick = () => deleteStudent(student._id);
    
    li.appendChild(deleteBtn);
    studentList.appendChild(li);
  });
}

// Thêm sinh viên mới
document.getElementById('add-student-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const major = document.getElementById('major').value;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, major })
  });

  fetchStudents();
  e.target.reset();
});

// Xóa sinh viên
async function deleteStudent(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchStudents();
}

fetchStudents();
