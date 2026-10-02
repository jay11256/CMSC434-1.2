/* =========================================================
   Kitchen Kompanion – P1.2 tab prototype
   All code written by the team. If you adapt any snippet
   from an online guide (e.g. W3Schools), add a comment
   above it with the URL, as the assignment requires.
   ========================================================= */

/* ---------- Tab switching (shared) ---------- */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const screenTitle = document.getElementById("screen-title");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => { t.classList.remove("active"); t.removeAttribute("aria-current"); });
    panels.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    tab.setAttribute("aria-current", "page");
    document.getElementById(tab.dataset.tab).classList.add("active");
    screenTitle.textContent = tab.dataset.title;

    if (tab.dataset.tab === "tab-colors") showPie();
  });
});

/* ---------- TAB 3: Colors – pie chart using Chart.js + datalabels ---------- */
// Based on https://www.chartjs.org/docs/latest/charts/doughnut.html
let pieChart = null;

function showPie() {
  if (pieChart) return;              // only build it once
  Chart.defaults.font.size = 20;     // default text is too small on the 640x960 screen

  pieChart = new Chart(document.getElementById("pie"), {
    type: "pie",
    plugins: [ChartDataLabels],
    data: {
      labels: ["Produce", "Dairy", "Grains", "Protein", "Drinks", "Snacks"],
      datasets: [{
        data: [30, 18, 14, 16, 10, 12],
        backgroundColor: ["red", "orange", "gold", "limegreen", "dodgerblue", "violet"],
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        datalabels: { color: "white" , formatter: (value) => value + "%"},
        tooltip: {
          callbacks: {
            label: (ctx) =>  ctx.parsed + "%",
          }
        }
      },
    },
  });
}

/* ---------- TAB 4: Profile – tap image to show a closable notice ---------- */
const smileyBtn = document.getElementById("smiley-btn");
const notice = document.getElementById("notice");
const noticeClose = document.getElementById("notice-close");

function openNotice() {
  notice.hidden = false;
  noticeClose.focus();
}
function closeNotice() {
  notice.hidden = true;
  smileyBtn.focus();
}
smileyBtn.addEventListener("click", openNotice);
noticeClose.addEventListener("click", closeNotice);
notice.addEventListener("click", (e) => { if (e.target === notice) closeNotice(); }); // tap outside
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !notice.hidden) closeNotice(); });

/* ---------- TAB 5: Choices – radio + dropdown + button ---------- */
document.getElementById("choices-btn").addEventListener("click", () => {
  const skill = document.querySelector('input[name="skill"]:checked').value;
  const mealSelect = document.getElementById("meal");
  const meal = mealSelect.options[mealSelect.selectedIndex].text.toLowerCase();

  const skillText = {
    beginner: "a beginner-friendly",
    intermediate: "an intermediate",
    advanced: "an advanced",
  }[skill];

  document.getElementById("choices-output").textContent =
    `Koko will look for ${skillText} ${meal} recipe using what's in your kitchen.`;
});

/* ---------- TAB 6: ToDo – add, cross off, delete ---------- */
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");

function updateEmptyState() {
  todoEmpty.hidden = todoList.children.length > 0;
}

function addTodo(text) {
  const li = document.createElement("li");
  li.className = "todo-item";

  const label = document.createElement("label");
  const box = document.createElement("input");
  box.type = "checkbox";
  const span = document.createElement("span");
  span.textContent = text;                       // textContent avoids injecting HTML
  box.addEventListener("change", () => li.classList.toggle("done", box.checked));
  label.append(box, span);

  const del = document.createElement("button");
  del.className = "todo-delete";
  del.setAttribute("aria-label", `Delete ${text}`);
  del.textContent = "×";
  del.addEventListener("click", () => { li.remove(); updateEmptyState(); });

  li.append(label, del);
  todoList.appendChild(li);
  updateEmptyState();
}

function addFromInput() {
  const text = todoInput.value.trim();
  if (!text) { todoInput.focus(); return; }
  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
}

document.getElementById("todo-add-btn").addEventListener("click", addFromInput);
todoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addFromInput(); });

// Starter items so the screenshot isn't empty
["Buy oat milk", "Use the spinach before Friday"].forEach(addTodo);
