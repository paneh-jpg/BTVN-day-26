console.log("Hello World");

// DOM node
const root = document.querySelector("#root");

// createElement
const h2 = document.createElement("h2");
h2.innerHTML = "DOM Node tạo ra bằng JS";

// append => đẩy dữ liệu xuống cuối
// root.append(h2);

//Clonde node để tạo ra phần tử nhiều lần và append lại vào
// root.append(h2.cloneNode(true));

// const button = document.createElement("button");
// button.innerHTML = "Click me";

// root.append(button);

// button.addEventListener("click", () => {
//   h2.style.color = "red";
// });

// Thêm phần tử ở trên h2
// const h3 = document.createElement("h3");
// h3.innerHTML = "F8";

// prepend => đẩy phần tử lên trên cùng trong root (ngược lại với append)
// root.prepend(h3);

const ul = document.createElement("ul");
// root.append(ul);

// button.addEventListener("click", () => {
//   const li = document.createElement("li");
//   li.innerText = `New item ${ul.children.length + 1}`;
//   ul.append(li);
// });

// Insert một phần tử vào phía trước 1 phần tử khác

const p = document.createElement("p");
p.innerText = "OK OK OK ";

// root.insertBefore(p, h2);

// insertAfter
const h3 = document.createElement("h3");
h3.innerHTML = "Insert After";
// root.insertBefore(h3, h2.nextElementSibling);

// replace
const div = document.createElement("div");
div.classList.add("red");

// phần tử cần thay đứng trước, cái bị thay đứng sau
// chỉ thay 1 cái đầu tiên
// root.replaceChild(div, p);

// root.append(p);

// removeChild => Xóa 1 node con nằm trong 1 node cha (Xóa cái cuối cùng, (chỉ xóa 1 cái thôi))
// root.removeChild(p);

// remove() => Xóa hết tất cả

// textNode => Không thuộc phần tử nào nhưng có thể tự update
const h2Two = document.createElement("h2");
h2Two.innerText = `Count: `;
const textNode = document.createTextNode(0);
h2Two.append(textNode);
root.append(h2Two);

const button = document.createElement("button");
button.innerHTML = "Increment";

root.append(button);

button.addEventListener("click", () => {
  textNode.data++;

  // Các elements bình thường cũng dùng ++ để tăng được
});
