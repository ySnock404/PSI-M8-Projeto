$(document).ready(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }
    // Helper method to parse the title tag from the response.
    function getTitle(text) {
      return text.match("<title>(.*)?</title>")[1];
    }
    // Make the actual CORS request.
    function makeCorsRequest() {
      // This is a sample server that supports CORS.
      var url =
        "http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html";
      var xhr = createCORSRequest("GET", url);
      if (!xhr) {
        alert("CORS not supported");
        return;
      }
      // Response handlers.
      xhr.onload = function () {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert("Response from CORS request to " + url + ": " + title);
      };
      xhr.onerror = function () {
        alert("Woops, there was an error making the request.");
      };
      xhr.send();
    }

    var userInput = $("#search").val();
    var url = "https://pokeapi.co/api/v2/pokemon/" + userInput;
    console.log(url);
    $.ajax({
      url: url,
      dataType: "json",
      method: "GET",
      success: function (data) {
        var name = data.forms[0].name,
          pokeImgFront = data.sprites.front_default,
          pokeImgBack = data.sprites.back_default,
          pokeImgShinyFront = data.sprites.front_shiny,
          pokeImgShinyBack = data.sprites.back_shiny,
          shiny = false,
          frontImg = true,
          speed = data.stats[0].base_stat,
          spDef = data.stats[1].base_stat,
          spAtk = data.stats[2].base_stat,
          def = data.stats[3].base_stat,
          atk = data.stats[4].base_stat,
          hp = data.stats[5].base_stat,
          id = "#" + data.id,
          weight = "<span class='stat'>Weight: </span>" + data.weight,
          height = "<span class='stat'>Height: </span>" + data.height,
          types = [];
        for (var i = 0; i < data.types.length; i++) {
          var type = data.types[i].type.name;
          types.push(type);
        }

        function pokemonType(types) {
          $("#types").html("");
          for (var i = 0; i < types.length; i++) {
            $("#types").append(
              "<div class='pokeType poke-info " +
                types[i] +
                "'>" +
                types[i] +
                " </div>"
            );
          }
        }

        $("#defaultBtn").click(function () {
          $("#pokeImage").attr("src", pokeImgFront);
          shiny = false;
          frontImg = true;
        });
        $("#shinyBtn").click(function () {
          $("#pokeImage").attr("src", pokeImgShinyFront);
          shiny = true;
          frontImg = true;
        });
        $(".changeBtn").click(function () {
          if (shiny == false && frontImg == true) {
            shiny = false;
            frontImg = false;
            $("#pokeImage").attr("src", pokeImgBack);
          } else if (shiny == false && frontImg == false) {
            shiny = false;
            frontImg = true;
            $("#pokeImage").attr("src", pokeImgFront);
          } else if (shiny == true && frontImg == true) {
            shiny = true;
            frontImg = false;
            $("#pokeImage").attr("src", pokeImgShinyBack);
          } else if (shiny == true && frontImg == false) {
            shiny = true;
            frontImg = true;
            $("#pokeImage").attr("src", pokeImgShinyFront);
          }
        });

        $(".name").html(name);
        $(".idNum").html(id);
        $("#pokeImage").attr("src", pokeImgFront);
        $(".hp").html(hp);
        $(".attack").html(atk);
        $(".defense").html(def);
        $(".special-attack").html(spAtk);
        $(".special-defense").html(spDef);
        $(".speed").html(speed);
        pokemonType(types);
        //console.log(data);
      } //SUCCESS
    }); //AJAX
  }); //FORM
});

var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// List View
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "100%";
  }
}

// Grid View
function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "50%";
  }
}
