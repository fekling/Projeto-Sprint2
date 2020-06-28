function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("graficoreal").style.marginLeft ='12%';
    document.getElementById("selector").style.paddingLeft = "200px";
    document.getElementById("escolhas").style.paddingLeft = "30px";
  }

  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("selector").style.paddingLeft = "30px";
    document.getElementById("escolhas").style.paddingLeft = "280px";
  }