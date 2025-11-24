const ul = document.querySelector("ul");

ul.addEventListener("click", (e) => {
  const li = e.target.parentElement;
  if (e.target.classList.contains("down")) {
    const nextLi = li.nextElementSibling;
    if (!nextLi) {
      return;
    }
    ul.insertBefore(nextLi, li);
  }
  if (e.target.classList.contains("up")) {
    const prevLi = li.previousElementSibling;
    if (!prevLi) {
      return;
    }
    ul.insertBefore(li, prevLi);
  }
  if (e.target.classList.contains("item")) {
    e.stopPropagation();
    removeActive();
    e.target.classList.add("active");

    const item = e.target;
    document.onkeyup = (e) => {
      handleDuplicate(e, item);
    };
  }
});

function removeActive() {
  const liList = document.querySelectorAll("li");
  liList.forEach((li) => {
    if (li.classList.contains("active")) {
      li.classList.remove("active");
    }
  });
}

document.addEventListener("click", () => {
  removeActive();
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
