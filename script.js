const users = [
  {
    date: new Date().toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    fio: "123",
    manager: "123",
    phone: "test",
    age: "test",
    place: "test",
    trailerLength: "test",
    experience: "test",
    method: "test",
    source: "test",
    referrer: "test",
    sbResult: "test",
    columnManager: "test",
    medicalCheck: "test",
    comment: "test",
    status: "test",
    message: "test",
  },
];
const requiredFields = [
  "fio",
  "phone",
  "age",
  "place",
  "experience",
  "method",
  "source",
  "status",
  "message",
];

const saveEntry = () => {
  const fio = document.getElementById("fio").value;
  const manager = document.getElementById("manager").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const place = document.getElementById("place").value;
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

  if (!validateForm()) return;

  const newUser = {
    date: new Date().toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    fio,
    manager,
    phone,
    age,
    place,
    trailerLength,
    experience,
    method,
    source,
    referrer,
    sbResult,
    columnManager,
    medicalCheck,
    comment,
    status,
    message,
  };

  users.push(newUser);
  renderTable();
  $("#addEntryModal").modal("hide");
  resetForm();
};

const validateForm = () => {
  for (const fieldId of requiredFields) {
    if (!document.getElementById(fieldId)?.value) {
      //showCustomAlert("Пожалуйста, заполните все обязательные поля!");
      return false;
    }
  }
  return true;
};
/*
const showCustomAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("custom-alert", "alert", "alert-danger");
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    document.body.removeChild(alertContainer);
  }, 2000);
};
*/

const renderTable = (data = users) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  data.forEach((user, index) => {
    const row = ` <tr>
            <td>${user.date}</td>
            <td>${user.place}</td>
            <td>${user.fio}</td>
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
    loadData();
  });
};

const editUser = (index) => {
  const user = users[index];

  document.getElementById("fio").value = user.fio;
  document.getElementById("manager").value = user.manager;
  document.getElementById("phone").value = user.phone;
  document.getElementById("age").value = user.age;
  document.getElementById("place").value = user.place;
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

  document.getElementById("save-entry").removeEventListener("click", saveEntry);
  document.getElementById("save-entry").addEventListener("click", () => {
    users[index] = {
      date: user.date,
      fio: document.getElementById("fio").value,
      manager: document.getElementById("manager").value,
      phone: document.getElementById("phone").value,
      age: document.getElementById("age").value,
      place: document.getElementById("place").value,
      trailerLength: document.getElementById("trailer_length").value,
      experience: document.getElementById("experience").value,
      method: document.getElementById("method").value,
      source: document.getElementById("source").value,
      referrer: document.getElementById("referrer").value,
      sbResult: document.getElementById("sb_result").value,
      columnManager: document.getElementById("column_manager").value,
      medicalCheck: document.getElementById("medical_check").value,
      comment: document.getElementById("comment").value,
      status: document.getElementById("status").value,
      message: document.getElementById("message").value,
    };

    renderTable();
    $("#addEntryModal").modal("hide");

    document.getElementById("save-entry").addEventListener("click", saveEntry);
  });
};

const deleteUser = (index) => {
  users.splice(index, 1);
  renderTable();
};

const checkDuplicate = () => {
  const phone = document.getElementById("phone").value;

  if (users.some((user) => user.phone === phone)) {
    //showCustomAlert("Номер телефона уже существует в базе данных!");
  } else {
    //showCustomAlert("Совпадений не найдено!");
  }
};

const filterData = () => {
  const fromFilter = document.getElementById("from-filter").value;
  const toFilter = document.getElementById("to-filter").value;
  const statusFilter = document.getElementById("status-filter").value;

  const filteredUsers = users.filter((user) => {
    return (
      (fromFilter === "Все" || user.place === fromFilter) &&
      (toFilter === "Все" || user.fio === toFilter) &&
      (statusFilter === "Все" || user.status === statusFilter)
    );
  });

  renderTable(filteredUsers);
};

const resetForm = () => {
  document.getElementById("entry-form").reset();
};

const loadData = () => {
  const toFilter = document.getElementById("to-filter");
  // const names = users.map((user) => user.fio);
  // names.forEach((name) => {
  //   if (
  //     isEqual(toFilter, name)
  //   ) {
  //     toFilter.add(new Option(name, name));
  //   }
  // });
  const existingNames = new Set(Array.from(toFilter.children).map(el => el.textContent));

  const uniqueUsers = users.filter(user => !existingNames.has(user.fio));
  uniqueUsers.forEach(user => {
    toFilter.add(new Option(user.fio, user.fio));
  });
  
};
// const isEqual = (element, elem) => {
//   let value = true;
//   Array.from(element.children).forEach((el) => {
//     if (el.textContent == elem) {
//       value = false;
//     }
//   });
//   return value;
// };

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  document.getElementById("save-entry").addEventListener("click", saveEntry);
  document
    .getElementById("check-duplicate")
    .addEventListener("click", checkDuplicate);
  document
    .getElementById("filter-button")
    .addEventListener("click", filterData);
});
