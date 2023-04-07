const body = document.querySelector("body");
if (body) {
  const button = document.createElement("button");
  button.innerText = "アラートを表示";
  button.addEventListener("click", () => {
    alert("おめでとうございます！");
  });
  body.append(button);
}

export {};
