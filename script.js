let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

function addStudent() {
    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const age = document.getElementById("studentAge").value.trim();
    const course = document.getElementById("studentCourse").value.trim();

    if (!id || !name || !age || !course) {
        alert("Please fill all fields!");
        return;
    }

    // Check duplicate Student ID
    const duplicate = students.find(student => student.id === id);

    if (duplicate) {
        alert("Student ID already exists!");
        return;
    }

    students.push({
        id: id,
        name: name,
        age: age,
        course: course
    });

    saveStudents();
    clearFields();
    displayStudents();
}

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function editStudent(index) {
    document.getElementById("studentId").value = students[index].id;
    document.getElementById("studentName").value = students[index].name;
    document.getElementById("studentAge").value = students[index].age;
    document.getElementById("studentCourse").value = students[index].course;

    students.splice(index, 1);
    saveStudents();
    displayStudents();
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveStudents();
        displayStudents();
    }
}

function searchStudent() {
    const search = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(search) ? "" : "none";
    });
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function clearFields() {
    document.getElementById("
