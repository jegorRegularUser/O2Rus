let users = [];

document.getElementById("save-entry").addEventListener("click", function () {
  const fio = document.getElementById("fio").value;
  const manager = document.getElementById("manager").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const region = document.getElementById("region").value;
  const trailerLength = document.getElementById("trailer_length").value;
  const experience = document.getElementById("experience").value;
  const method = document.getElementById("method").value;
  const source = document.getElementById("source").value;
  const referrer = document.getElementById("referrer").value;
  const sbResult = document.getElementById("sb_result").value;
  const columnManager = document.getElementById("column_manager").value;
  const medicalCheck = document.getElementById("medical_check").value;
  const comment = document.getElementById("comment").value;
  const status = document.getElementById("status").value;
  const message = document.getElementById("message").value;

  const newUser = {
    date: new Date().toLocaleString(),
    from: region, // Using region as sender's location
    to: fio,
    phone,
    method,
    comment,
    status,
    message,
    manager,
  };

  users.push(newUser);
  renderTable();
  $("#addEntryModal").modal("hide");
});

function renderTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = `<tr>
            <td>${user.date}</td>
            <td>${user.from}</td>
            <td>${user.to}</td>
            <td>${user.phone}</td>
            <td>${user.method}</td>
            <td>${user.comment}</td>
            <td>${user.status}</td>
            <td>${user.message}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Редактировать</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Удалить</button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

function editUser(index) {
  const user = users[index];
  // Заполнение формы для редактирования записи
  document.getElementById("fio").value = user.fio;
  document.getElementById("manager").value = user.manager;
  document.getElementById("phone").value = user.phone;
  document.getElementById("age").value = user.age;
  document.getElementById("region").value = user.region;
  document.getElementById("trailer_length").value = user.trailerLength;
  document.getElementById("experience").value = user.experience;
  document.getElementById("method").value = user.method;
  document.getElementById("source").value = user.source;
  document.getElementById("referrer").value = user.referrer;
  document.getElementById("sb_result").value = user.sbResult;
  document.getElementById("column_manager").value = user.columnManager;
  document.getElementById("medical_check").value = user.medicalCheck;
  document.getElementById("comment").value = user.comment;
  document.getElementById("status").value = user.status;
  document.getElementById("message").value = user.message;

  $("#addEntryModal").modal("show");

  document
    .getElementById("save-entry")
    .addEventListener("click", function updateEntry() {
      users[index] = {
        date: user.date,
        from: document.getElementById("region").value,
        to: document.getElementById("fio").value,
        phone: document.getElementById("phone").value,
        method: document.getElementById("method").value,
        comment: document.getElementById("comment").value,
        status: document.getElementById("status").value,
        message: document.getElementById("message").value,
      };

      renderTable();
      $("#addEntryModal").modal("hide");
      document
        .getElementById("save-entry")
        .removeEventListener("click", updateEntry);
    });
}

function deleteUser(index) {
  users.splice(index, 1);
  renderTable();
}

document
  .getElementById("check-duplicate")
  .addEventListener("click", function () {
    const phone = document.getElementById("phone").value;

    if (users.some((user) => user.phone === phone)) {
      alert("Номер телефона уже существует в базе данных!");
    } else {
      alert("Совпадений не найдено!");
    }
  });

document.getElementById("filter-button").addEventListener("click", function () {
  // Фильтрация данных по заданным критериям
  const fromFilter = document.getElementById("from-filter").value;
  const toFilter = document.getElementById("to-filter").value;
  const statusFilter = document.getElementById("status-filter").value;

  const filteredUsers = users.filter((user) => {
    return (
      (fromFilter === "Все" || user.from === fromFilter) &&
      (toFilter === "Все" || user.to === toFilter) &&
      (statusFilter === "Все" || user.status === statusFilter)
    );
  });

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  filteredUsers.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.date}</td>
        <td>${user.from}</td>
        <td>${user.to}</td>
        <td>${user.phone}</td>
        <td>${user.method}</td>
        <td>${user.comment}</td>
        <td>${user.status}</td>
        <td>${user.message}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${index})">
            Редактировать
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">
            Удалить
          </button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
});
