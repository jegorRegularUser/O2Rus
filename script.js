const generateId = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random();
   return `${timestamp}${randomPart}`;
};
const users_stubs = [{
  id: generateId(),
  date: new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  fio: "Двойняков Егор Сергеевич",
  manager: "123",
  phone: "8987545263",
  age: "18",
  place: "Московская",
  trailerLength: "10",
  experience: "2",
  method: "",
  source: "Знакомые",
  referrer: "",
  sbResult: "",
  columnManager: "",
  medicalCheck: "",
  comment: "",
  status: "Доставлено",
  message: "",
},
{
  id: generateId(),
  date: new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  fio: "Иванов Иван Иванович",
  manager: "321",
  phone: "9876543210",
  age: "25",
  place: "Ленинградская",
  trailerLength: "20",
  experience: "до 3",
  method: "WhatsApp",
  source: "Знакомые",
  referrer: "",
  sbResult: "",
  columnManager: "Начальник 1",
  medicalCheck: "",
  comment: "",
  status: "Доставлено",
  message: "",
},
{
  id: generateId(),
  date: new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  fio: "Петрова Анна Сергеевна",
  manager: "456",
  phone: "7654321098",
  age: "32",
  place: "Нижегородская",
  trailerLength: "10",
  experience: "до 5",
  method: "SMS",
  source: "Интернет",
  referrer: "",
  sbResult: "",
  columnManager: "Начальник 2",
  medicalCheck: "",
  comment: "",
  status: "Доставлено",
  message: "",
},
{
  id: generateId(),
  date: new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  fio: "Сидоров Максим Александрович",
  manager: "789",
  phone: "0987654321",
  age: "41",
  place: "Самарская",
  trailerLength: "20",
  experience: "более 5",
  method: "Telegram",
  source: "Интернет",
  referrer: "",
  sbResult: "",
  columnManager: "Начальник 1",
  medicalCheck: "",
  comment: "",
  status: "Доставлено",
  message: "",
},
{
  id: generateId(),
  date: new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  fio: "Смирнова Екатерина Дмитриевна",
  manager: "135",
  phone: "5678901234",
  age: "27",
  place: "Свердловская",
  trailerLength: "10",
  experience: "до 1",
  method: "Viber",
  source: "Знакомые",
  referrer: "",
  sbResult: "",
  columnManager: "Начальник 2",
  medicalCheck: "",
  comment: "",
  status: "Доставлено",
  message: "",
},]
const from_stubs = [
  "Московская",
  "Ленинградская",
  "Нижегородская",
  "Самарская",
  "Свердловская",
  "Новосибирская",
  "Ростовская",
];
const manager_stubs = ["Менеджер 1", "Менеджер 2"];
const trailer_length_stubs = ["10 м", "20 м"];
const experience_stubs = ["до 1", "до 3", "до 5", "более 5"];
const send_method_stubs = ["WhatsApp", "SMS", "Telegram", "Viber"];
const source_stubs = ["Знакомые", "Интернет"];
const column_manager_stubs = ["Начальник 1", "Начальник 2"];
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


const users = [
  ...users_stubs
];

const saveEntry = (e) => {
  e.preventDefault();
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
    id: generateId(),
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
  let value = true;
  for (const fieldId of requiredFields) {
    document.getElementById(fieldId).classList.remove("is-invalid");
    if (!document.getElementById(fieldId)?.value) {
      document.getElementById(fieldId).classList.add("is-invalid");
      value = false;
    }
  }
  return value;
};

requiredFields.forEach((fieldId) => {
  document.getElementById(fieldId).addEventListener("focus", () => {
    document.getElementById(fieldId).classList.remove("is-invalid");
  });
});

const renderTable = (data = users) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  data.forEach((user) => {
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
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"class="lucide lucide-file-pen-line">
                   <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/>
                   <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
                   <path d="M8 18h1"/>
                  </svg>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
    loadData();
  });
};

let saveChangesHandler = null;

const saveChanges =  (id, index, user) => (e) =>  {
  e.preventDefault();
  users[index] = {
    id,
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
  document.getElementById("save-entry").removeEventListener("click", saveChangesHandler);
  document.getElementById("save-entry").addEventListener("click", saveEntry);
  saveChangesHandler = null;
}

const editUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
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
  saveChangesHandler = saveChanges(id, index, user);
  document.getElementById("save-entry").addEventListener("click", saveChangesHandler);
};

$("#addEntryModal").on("hidden.bs.modal", () => {
  if (saveChangesHandler) {
    document.getElementById("save-entry").removeEventListener("click", saveChangesHandler);
    saveChangesHandler = null;
  }
});

const deleteUser = (id) => {
  users.splice(
    users.findIndex((user) => user.id == id),
    1
  );
  renderTable();
};

const modal = document.getElementById("addEntryModal");

const checkDuplicate = () => {
  const phone = document.getElementById("phone").value;

  if (users.some((user) => user.phone === phone)) {
    showAlert("Номер телефона уже существует в базе данных!", modal);
  } else {
    //showAlert("Совпадений не найдено!");
  }
};

const showAlert = (message, element) => {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert-error");
  alertContainer.textContent = message;

  const existingAlert = element.querySelector(".alert-error");
  if (existingAlert) {
    clearTimeout(existingAlert.dataset.timeoutId);
    element.removeChild(existingAlert);
  }

  element.appendChild(alertContainer);

  const timeoutId = setTimeout(() => {
    element.removeChild(alertContainer);
  }, 3000);

  alertContainer.dataset.timeoutId = timeoutId;
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
  const existingNames = new Set(
    Array.from(toFilter.children).map((el) => el.textContent)
  );

  const uniqueUsers = users.filter((user) => !existingNames.has(user.fio));
  uniqueUsers.sort();
  uniqueUsers.forEach((user) => {
    toFilter.add(new Option(user.fio, user.fio));
  });
};

const selects = {
  "from-filter": from_stubs,
  manager: manager_stubs,
  place: from_stubs,
  trailer_length: trailer_length_stubs,
  experience: experience_stubs,
  method: send_method_stubs,
  source: source_stubs,
  column_manager: column_manager_stubs,
};
Object.keys(selects).forEach((selectId) => {
  const select = document.getElementById(selectId);
  selects[selectId].forEach((option) => {
    select.add(new Option(option, option));
  });
});
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
