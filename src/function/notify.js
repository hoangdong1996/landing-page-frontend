export function errorNotify(component) {
  component.$notify({
    title: "Error",
    message: "error",
  });
}
export function successNotify(component) {
  component.$notify({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
}
