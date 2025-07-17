// const myModal = document.getElementById("exampleModal");
// console.log("its work");

// myModal.modal("show");

// $(document).ready(function () {
//   $("#exampleModal").modal("toggle");
// });

const myModal = new bootstrap.Modal(
  document.getElementById("exampleModal"),
  {}
);
myModal.toggle();
