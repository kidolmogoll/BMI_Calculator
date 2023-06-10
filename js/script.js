document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log('readyState: "Complete"');
    initApp();
  }
});

// MAIN VARAIBLES

const body = document.querySelector("body");
const mainPage = document.querySelector("main");
const bmiContainer = document.querySelector(".bmi-container");
const savedResultContainer = document.querySelector(".saved_bmi_results");

savedResultContainer.style.display = "none";

const initApp = () => {
  // BMI CALCULATION JAVASCRIPT

  // VARIABLES
  const switchBtn = document.querySelector(".switch_btn");
  const switchBtnBack = document.querySelector(".switch_btn_back");
  switchBtnBack.style.display = "none";
  const savedResultsContainer = document.querySelector(".saved_bmi_list");
  const saveBtn = document.querySelector(".save-option img");
  const blur = document.querySelector("#blur");
  const male = document.querySelector(".gender figure img.male");
  const female = document.querySelector(".gender figure img.female");
  const height = document.querySelector("#height");
  const weight = document.querySelector("#weight");
  const calculateBtn = document.querySelector(".calculate-btn");
  const bmiResult = document.querySelector(".result");
  const cardHead = document.querySelector(".card_head");
  const bmiTrack = document.querySelector(".bmi_track");
  const bmiThumb = document.querySelector(".bmi-thumb");
  const conclusion = document.querySelector(".bmi-card div span");
  const result = document.querySelector("#bmi-result");

  switchBtn.onclick = () => {
    mainPage.style.display = "none";
    bmiContainer.style.display = "none";
    savedResultContainer.style.display = "block";
    switchBtnBack.style.display = "block";
  };

  switchBtnBack.onclick = () => {
    mainPage.style.display = "grid";
    bmiContainer.style.display = "grid";
    savedResultContainer.style.display = "none";
    switchBtnBack.style.display = "none";
  };
  // maleFemale FUNCTION

  const bmiSavedFunction = (gender) => {
    saveBtn.onclick = () => {
      const savedResult = saveBtn.parentElement.parentElement;
      const bmiResult = savedResult.querySelector(".result").innerText;
      const conclusion = savedResult.querySelector(".conclusion").innerText;
      const li = document.createElement("li");
      li.innerHTML = `
            <li class="saved_result_card">
              <div class="saved_gender_container">
                <h2 class="saved_gender_head">Gender:</h2>
                <p>${gender}</p>
              </div>
              <article class="saved_bmi_card">
                <div class="saved_bmi_container">
                  <h2 class="saved_card_head">BMI:</h2>
                  <span class="saved_result">${bmiResult}</span>
                </div>
                <div class="saved_bmi_scale_container">
                  <h2 class="saved_bmi_track_head">BMI Scale:</h2>
                  <ul class="saved_bmi_track">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <div class="saved_bmi-thumb"></div>
                  </ul>
                </div>
                <div class="saved_conclusion"><span>${conclusion}</span></div>
              </article>
              <article class="saved_delete-option">
                <img width="20px" src="img/trash-solid.svg" />
              </article>
            </li>
    `;
      const bmiThumb = li.querySelector(".saved_bmi-thumb");
      bmiThumb.style.transform =
        conclusion === "Obese"
          ? "transform: translateX(44px);"
          : conclusion === "Overweight"
          ? "translateX(15px)"
          : conclusion === "Healthy weight"
          ? "translateX(-15px)"
          : "translateX(-44px)";
      savedResultsContainer.appendChild(li);
      const deleteBtn = li.querySelector(".saved_delete-option img");
      deleteBtn.onclick = () => {
        alert("BMI Result Removed");
        savedResultsContainer.removeChild(li);
      };
    };
  };

  male.onclick = () => {
    female.classList.remove("active");
    male.classList.add("active");
    bmiSavedFunction("male");
  };
  female.onclick = () => {
    male.classList.remove("active");
    female.classList.add("active");
    bmiSavedFunction("female");
  };

  calculateBtn.onclick = () => {
    // BMI CALCULATION LOGIC
    let hgt = Number(height.value);
    let wgt = Number(weight.value);
    // let bmi = (wgt / (hgt * hgt)) * 703; NORTH AMERICAN
    let bmi = wgt / (hgt * hgt);
    bmiResult.innerText = bmi.toFixed(1);

    // SUMMARY PAGE FUNCTIONS
    conclusion.innerText =
      bmiResult.innerText >= 30
        ? "Obese"
        : bmiResult.innerText >= 25 && bmiResult.innerText <= 29.9
        ? "Overweight"
        : bmiResult.innerText >= 18.5 && bmiResult.innerText <= 24.9
        ? "Healthy weight"
        : bmiResult.innerText <= 18.5
        ? "Underweight"
        : "Uncalculated";
    bmiThumb.style.transform =
      conclusion.innerText === "Obese"
        ? "transform: translateX(44px);"
        : conclusion.innerText === "Overweight"
        ? "translateX(15px)"
        : conclusion.innerText === "Healthy weight"
        ? "translateX(-15px)"
        : "translateX(-44px)";

    height.value = "";
    weight.value = "";
    result.classList.add("active");
    blur.classList.add("blur");
    cardHead.style.display = "block";
    bmiTrack.style.opacity = "1";

    // BMI UNCALCULATED CONDITIONS

    const saveOption = document.querySelector(".save-option");

    if (bmiResult.innerText == "NaN") {
      bmiTrack.style.opacity = "0.3";
      cardHead.style.display = "none";
      bmiResult.innerText = "Try Again";
      saveOption.style.display = "none";
    } else {
      saveOption.style.display = "flex";
    }
  };
  const untoggle = document.querySelector("#untoggle");
  untoggle.onclick = () => {
    result.classList.remove("active");
    blur.classList.remove("blur");
  };
};
