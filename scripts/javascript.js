// 1RM Calculator

// This is a translation of Tuchscherer's standard percentage chart into
// a continuous function. This enables using real numbers for RPEs, like 8.75.
function percentage(reps, rpe) {
  // Cap the RPE at 10.
  if (rpe > 10) {
    rpe = 10.0;
  }

  // No prediction if failure occurred, or if RPE is unreasonably low.
  if (reps < 1 || rpe < 4) {
    return 0.0;
  }

  // Handle the obvious case early to avoid bound errors.
  if (reps === 1 && rpe === 10.0) {
    return 100.0;
  }

  // x is defined such that 1@10 = 0, 1@9 = 1, 1@8 = 2, etc.
  // By definition of RPE, then also:
  //  2@10 = 1@9 = 1
  //  3@10 = 2@9 = 1@8 = 2
  // And so on. That pattern gives the equation below.
  var x = (10.0 - rpe) + (reps - 1);

  // The logic breaks down for super-high numbers,
  // and it's too hard to extrapolate an E1RM from super-high-rep sets anyway.
  if (x >= 16) {
    return 0.0;
  }

  var intersection = 2.92;

  // The highest values follow a quadratic.
  // Parameters were resolved via GNUPlot and match extremely closely.
  if (x <= intersection) {
    var a = 0.347619;
    var b = -4.60714;
    var c = 99.9667;
    return a*x*x + b*x + c;
  }

  // Otherwise it's just a line, since Tuchscherer just guessed.
  var m = -2.64249;
  var b = 97.0955;
  return m*x + b;
}

function calc() {
  let have_weight = Number(document.getElementById("have-weight").value);
  let have_reps = Number(document.getElementById("have-reps").value);
  let have_rpe = Number(document.getElementById("have-rpe").value);
  let calc_e1rm = document.getElementById("calc-e1rm");


  // Clear the HTML at the start.
  calc_e1rm.innerHTML = "";


  // Ensure that the E1RM widgets are sane.
  if (isNaN(have_weight) || have_weight <= 0) return;
  if (isNaN(have_reps) || have_reps <= 0) return;
  if (Math.floor(have_reps) !== have_reps) return;
  if (isNaN(have_rpe) || have_rpe <= 0) return;

  // Calculate the E1RM percentage.
  var p = percentage(have_reps, have_rpe);
  if (p <= 0) return;
  var e1rm = have_weight / p * 100;
  if (e1rm <= 0) return;

  // Write the E1RM.
  calc_e1rm.innerHTML = e1rm.toFixed(1);

}

document.addEventListener("DOMContentLoaded", function(e){calc()});





// assigning variables for tables
let workout = document.querySelectorAll('.workout');
let button = document.querySelectorAll('.btn');
let table = document.querySelectorAll('table');


// function to hide all divs
function hideAll() {
  workout.forEach(function(el) {
    el.style.display = 'none';
  });
}

// run that function right away
hideAll();

// when any button is clicked, make the suitable div appear
button.forEach(function(el) {
  el.onclick = (e) => {
    // hide all the divs to ensure that only one will be open
    hideAll();

// here is a switch statement to handle opening the right div
switch (e.target.getAttribute('id')) {
  case 'chest':
    document.querySelector('#chestTable')
      .style.display = 'block';
    break;
    case 'back':
      document.querySelector('#backTable')
        .style.display = 'block';
      break;
    case 'biceps':
      document.querySelector('#bicepsTable')
        .style.display = 'block';
      break;
    case 'triceps':
      document.querySelector('#tricepsTable')
        .style.display = 'block';
      break;
    case 'shoulders':
      document.querySelector('#shouldersTable')
        .style.display = 'block';
      break;
    case 'legs':
      document.querySelector('#legsTable')
        .style.display = 'block';
      break;
  } // end of switch
  // switch does not need default for this

  } // end of function for clicking

  }); // end of forEach()
