const API = "/api/courses";
const PAGE_SIZE = 6;

const grid = document.getElementById("course-grid");
const statusLine = document.getElementById("status-line");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const addBtn = document.getElementById("add-course");
const dialog = document.getElementById("course-dialog");
const form = document.getElementById("course-form");
const dialogTitle = document.getElementById("dialog-title");
const formError = document.getElementById("form-error");
const toastEl = document.getElementById("toast");
const cancelBtn = document.getElementById("cancel-dialog");

let page = 1;
let total = 0;

function difficultyLabel(value) {
  const labels = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };
  return labels[value] || `Level ${value}`;
}

function toast(message) {
  toastEl.hidden = false;
  toastEl.textContent = message;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2800);
}

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.status === "error") {
    throw new Error(payload.message || "Request failed");
  }
  return payload.data;
}

async function loadCourses() {
  grid.innerHTML = "";
  statusLine.textContent = "Loading catalog…";
  try {
    const data = await parseResponse(
      await fetch(`${API}?page=${page}&limit=${PAGE_SIZE}`)
    );
    const courses = data.courses || [];
    total = Number(data.total) || 0;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    statusLine.textContent = total
      ? `Showing page ${page} of ${pageCount} · ${total} courses`
      : "No courses yet";

    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= pageCount || total === 0;

    if (!courses.length) {
      grid.innerHTML = `<p class="empty">Nothing on this page. Add a course to get started.</p>`;
      return;
    }

    grid.innerHTML = courses.map(courseCard).join("");
    grid.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => openEdit(btn.dataset.edit));
    });
    grid.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => removeCourse(btn.dataset.delete, btn.dataset.label));
    });
  } catch (error) {
    statusLine.textContent = "Could not load courses";
    grid.innerHTML = `<p class="error-state">${error.message}</p>`;
  }
}

function courseCard(course) {
  const id = course._id;
  const label = escapeHtml(course.label);
  return `
    <article class="card">
      <h2>${label}</h2>
      <p class="meta">${escapeHtml(course.author)} · ${escapeHtml(String(course.release_year))}</p>
      <div class="chips">
        <span class="chip">${escapeHtml(course.topic)}</span>
        <span class="chip">${difficultyLabel(course.difficulty)}</span>
        <span class="chip">${escapeHtml(course.format)}</span>
        <span class="chip">${escapeHtml(course.price)}</span>
      </div>
      <div class="card-actions">
        <a href="${escapeAttr(course.url)}" target="_blank" rel="noopener noreferrer">Open</a>
        <button type="button" class="btn ghost small" data-edit="${escapeAttr(id)}">Edit</button>
        <button type="button" class="btn danger small" data-delete="${escapeAttr(id)}" data-label="${escapeAttr(course.label)}">Delete</button>
      </div>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function resetForm() {
  form.reset();
  document.getElementById("field-id").value = "";
  formError.hidden = true;
  formError.textContent = "";
}

function openCreate() {
  resetForm();
  dialogTitle.textContent = "Add course";
  dialog.showModal();
}

async function openEdit(id) {
  resetForm();
  dialogTitle.textContent = "Edit course";
  try {
    const data = await parseResponse(await fetch(`${API}/${id}`));
    const course = data.course;
    document.getElementById("field-id").value = course._id;
    document.getElementById("field-label").value = course.label;
    document.getElementById("field-topic").value = course.topic;
    document.getElementById("field-author").value = course.author;
    document.getElementById("field-difficulty").value = course.difficulty;
    document.getElementById("field-year").value = course.release_year;
    document.getElementById("field-price").value = course.price;
    document.getElementById("field-format").value = course.format;
    document.getElementById("field-url").value = course.url;
    dialog.showModal();
  } catch (error) {
    toast(error.message);
  }
}

function readForm() {
  return {
    label: document.getElementById("field-label").value.trim(),
    topic: document.getElementById("field-topic").value.trim(),
    author: document.getElementById("field-author").value.trim(),
    difficulty: Number(document.getElementById("field-difficulty").value),
    release_year: Number(document.getElementById("field-year").value),
    price: document.getElementById("field-price").value.trim(),
    format: document.getElementById("field-format").value.trim(),
    url: document.getElementById("field-url").value.trim()
  };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.hidden = true;
  const id = document.getElementById("field-id").value;
  const body = readForm();
  try {
    const response = await fetch(id ? `${API}/${id}` : API, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    await parseResponse(response);
    dialog.close();
    toast(id ? "Course updated" : "Course added");
    await loadCourses();
  } catch (error) {
    formError.hidden = false;
    formError.textContent = error.message;
  }
});

async function removeCourse(id, label) {
  const ok = window.confirm(`Delete “${label}”?`);
  if (!ok) return;
  try {
    await parseResponse(await fetch(`${API}/${id}`, { method: "DELETE" }));
    toast("Course deleted");
    if (page > 1 && (total - 1) <= (page - 1) * PAGE_SIZE) {
      page -= 1;
    }
    await loadCourses();
  } catch (error) {
    toast(error.message);
  }
}

addBtn.addEventListener("click", openCreate);
cancelBtn.addEventListener("click", () => dialog.close());
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadCourses();
  }
});
nextBtn.addEventListener("click", () => {
  page += 1;
  loadCourses();
});

loadCourses();
