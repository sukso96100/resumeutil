function showToast(textmsg) {
    console.log("Showing Toast Message");
    var toast = document.getElementById("toast");
    toast.setAttribute("text", textmsg);
    toast.show();
  }