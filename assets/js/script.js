const ul = document.querySelector("ul");

ul.addEventListener("click", (e) => {
  const li = e.target.closest("li.item");
  if (e.target.classList.contains("down")) {
    if (!li || !li.classList.contains("active")) return;
    const nextLi = li.nextElementSibling;
    if (!nextLi) {
      return;
    }
    ul.insertBefore(nextLi, li);
  }
  if (e.target.classList.contains("up")) {
    if (!li || !li.classList.contains("active")) return;
    const prevLi = li.previousElementSibling;
    if (!prevLi) {
      return;
    }
    ul.insertBefore(li, prevLi);
  }
  if (e.target.classList.contains("item")) {
    e.stopPropagation();

    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      return;
    }

    removeActive();
    e.target.classList.add("active");

    const item = e.target;
    document.onkeyup = (e) => {
      handleDuplicate(e, item);
    };
  }
});

function addActive() {}

function removeActive() {
  const liList = document.querySelectorAll("li");
  liList.forEach((li) => {
    if (li.classList.contains("active")) {
      li.classList.remove("active");
    }
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("li.item")) {
    removeActive();
  }
});

function handleDuplicate(e, item) {
  if (!(e.altKey && e.shiftKey)) return;

  const newItem = item.cloneNode(true);
  newItem.classList.remove("active");

  if (e.altKey && e.shiftKey) {
    if (e.key === "ArrowDown") {
      const nextItem = item.nextElementSibling;
      ul.insertBefore(newItem, nextItem);
    }
    if (e.key === "ArrowUp") {
      ul.insertBefore(newItem, item);
    }
  }
}

const contextMenu = document.querySelector("#context-menu");
const renameBtn = contextMenu.querySelector("#rename");
const deleteBtn = contextMenu.querySelector("#delete");

const modal = document.querySelector("#modal");
const modalTitle = modal.querySelector("#modal-title");
const modalBody = modal.querySelector("#modal-body");
const cancelBtn = modal.querySelector("#modal-cancel");
const confirmBtn = modal.querySelector("#modal-confirm");

let currentItem = null;
ul.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const li = e.target.closest("li.item");
  if (!li) return;

  if (e.target.classList.contains("item")) {
    contextMenu.style.left = e.clientX + "px";
    contextMenu.style.top = e.clientY + "px";
    contextMenu.style.display = "block";
  }

  removeActive();
  li.classList.add("active");
  currentItem = li;
});

document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    contextMenu.style.display = "none";
  }
});

deleteBtn.addEventListener("click", (e) => {
  if (!currentItem) return;

  modal.classList.remove("hide");
  modalTitle.innerHTML = "Are you sure you want to delete?";
  modalBody.innerHTML = ` <p>Please note that once this item is deleted, it cannot be restored.</p>`;

  confirmBtn.onclick = () => {
    currentItem.remove();
    currentItem = null;
    modal.classList.add("hide");

    closeModal();
  };
});

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

renameBtn.addEventListener("click", (e) => {
  if (!currentItem) return;

  modal.classList.remove("hide");
  modalTitle.innerHTML = "Rename Item";
  modalBody.innerHTML = "Enter a new name:";

  const input = document.createElement("input");
  input.style.width = "95%";
  input.style.marginTop = "8px";
  input.style.padding = "10px";
  input.value = currentItem.childNodes[0].textContent.trim();
  modalBody.appendChild(input);
  input.focus();

  function applyRename() {
    const newValue = escapeHTML(input.value.trim());

    if (newValue !== "") {
      currentItem.childNodes[0].textContent = newValue + " ";
    }
    modal.classList.add("hide");
  }
  confirmBtn.onclick = applyRename;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      applyRename();
    }
  });
});

function closeModal() {
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === cancelBtn) {
      modal.classList.add("hide");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hide");
    }
  });
}

closeModal();
