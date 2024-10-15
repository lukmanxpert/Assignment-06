// load category
const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategory(data.categories);
};
// remove active button
const removeActiveBtn = () => {
  const activeBtn = document.getElementsByClassName("activeBtn");
  for (const btn of activeBtn) {
    btn.style.removeProperty("background-color");
    btn.style.removeProperty("border-radius");
  }
};
// display category
const displayCategory = (categories) => {
  const categorySection = document.getElementById("categories-section");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList = "w-44 flex justify-center items-center";
    div.innerHTML = `
        <button id="btn-${category.id}" class="btn w-full font-bold text-secondary text-xl bg-transparent border-2 flex gap-4"><img class="max-w-full max-h-full py-3" src="${category.category_icon}"> ${category.category}</button>
        `;
    categorySection.appendChild(div);
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => {
      loadCategoryPets(btn.innerText);
      btn.classList.add("activeBtn");
      removeActiveBtn();
      btn.style.backgroundColor = "rgba(14, 122, 129, 0.1)";
      btn.style.borderRadius = "120px";
    });
  });
};
// load category pets
const loadCategoryPets = async (name) => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${name}`
    );
    const data = await response.json();
    setTimeout(() => {
      displayPets(data.data);
      spinner.classList.add("hidden");
    }, 2000);
  } catch (error) {
    console.error("Error loading category pets:", error);
    spinner.classList.add("hidden");
  }
};
// load all pets
const loadAllPets = async () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  setTimeout(() => {
    displayPets(data.pets);
    spinner.classList.add("hidden");
  }, 2000);
};
// display thumbnail
const displayThumbnail = (image) => {
  const selectedImgSection = document.getElementById("selected-image-section");
  const imgDiv = document.createElement("div");
  imgDiv.innerHTML = `
  <img class="rounded-md" src="${image}">
  `;
  selectedImgSection.appendChild(imgDiv);
};
// open modal
const openModal = (
  pet_name,
  breed,
  date_of_birth,
  gender,
  price,
  image,
  vaccinated_status,
  pet_details
) => {
  if (date_of_birth === "null" || date_of_birth === "undefined") {
    date_of_birth = "Not Available";
  }
  if (breed === "null" || breed === "undefined") {
    breed = "Not Available";
  }
  if (gender === "null" || gender === "undefined") {
    gender = "Not Available";
  }
  if (price === "null" || price === "undefined") {
    price = "Not Available";
  }
  if (vaccinated_status === "null" || vaccinated_status === "undefined") {
    vaccinated_status = "Not Available";
  }
  const modalSection = document.getElementById("modal-div");
  modalSection.innerHTML = "";
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
  <img class="rounded-md w-full" src="${image}">
  <h1 class="text-secondary text-2xl font-bold my-2">${pet_name}</h1>
  <div class="grid grid-cols-2 gap-2">
  <p><i class="fa-regular fa-heart h-6 w-6"></i> Breed: ${breed}</p>
  <p><i <i class="fa-regular fa-calendar h-6 w-6"></i> Birth: ${date_of_birth}</p>
  <p><i class="fa-solid fa-venus h-6 w-6"></i> Gender: ${gender}</p>
  <p><i class="fa-solid fa-dollar-sign h-6 w-6"></i> Price: ${price} $</p>
  <p><i class="fa-solid fa-syringe h-6 w-6"></i> Vaccinated Status: ${vaccinated_status}</p>
  </div>
  <hr class="border-2 my-2">
  <h1 class="font-semibold text-base text-secondary">Details Information</h1>
  <p>${pet_details}</p>
  `;
  modalSection.appendChild(modalDiv);
};
// display pets
const displayPets = (pets) => {
  const allPetsDiv = document.getElementById("all-pets-div");
  allPetsDiv.innerHTML = "";
  if (pets.length == 0) {
    allPetsDiv.classList.remove("grid");
    allPetsDiv.innerHTML = `
    <div class="bg-[#f8f8f8] rounded-lg flex flex-col justify-center items-center p-6 w-full">
    <img class="text-center" src="./images/error.webp">
    <h1 class="font-bold text-2xl text-secondary">No Information Available</h1>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  } else {
    allPetsDiv.classList.add("grid");
  }
  pets.forEach((pet) => {
    const petDiv = document.createElement("div");
    petDiv.classList = "p-6 border-2 rounded-lg";
    petDiv.innerHTML = `
    <img src="${pet.image}" class="rounded-lg w-full">
    <h1 class="text-[rgba(19, 19, 19, 0.7)] text-secondary font-bold text-2xl py-2">${
      pet.pet_name || "Not Available"
    }</h1>
    <p clas="text-[rgba(19, 19, 19, 0.7)]"><i class="fa-regular fa-heart h-6 w-6"></i> Breed: ${
      pet.breed || "Not Available"
    }</p>
    <p clas="text-[rgba(19, 19, 19, 0.7)]"><i class="fa-regular fa-calendar h-6 w-6"></i> Birth: ${
      pet.date_of_birth || "Not Available"
    }</p>
    <p clas="text-[rgba(19, 19, 19, 0.7)]"><i class="fa-solid fa-venus h-6 w-6"></i> Gender: ${
      pet.gender || "Not Available"
    }</p>
    <p clas="text-[rgba(19, 19, 19, 0.7)]"><i class="fa-solid fa-dollar-sign h-6 w-6"></i> Price: ${
      pet.price || "Not Available"
    } $</p>
    <hr class="border border-[rgba(19, 19, 19, 0.7)] my-2">
    <div class="flex justify-start items-center gap-2 md:gap-4 md:justify-center">
    <button class="border py-2 px-1 md:px-2 rounded-md border-[rgba(14, 122, 129, 0.15)]" onclick="displayThumbnail('${
      pet.image
    }')"><i class="fa-solid fa-thumbs-up"></i></button>
    <button class="border py-2 px-1 md:px-2 rounded-md border-[rgba(14, 122, 129, 0.15)] text-primary font-bold md:text-xl" onclick="adoptPet(this)">Adopt</button>
    <button class="border py-2 px-1 md:px-2 rounded-md border-[rgba(14, 122, 129, 0.15)] text-primary font-bold md:text-xl" onclick="my_modal_5.showModal(); openModal('${
      pet.pet_name
    }', '${pet.breed}', '${pet.date_of_birth}', '${pet.gender}', '${
      pet.price
    }', '${pet.image}', '${pet.vaccinated_status}', '${pet.pet_details.replace(
      /'/g,
      "\\'"
    )}')">Details</button>
    </div>
    `;
    allPetsDiv.appendChild(petDiv);
  });
};
// adpot pet modal
const adoptPet = (button) => {
  button.disabled = true;
  button.classList.add("opacity-50", "cursor-not-allowed");
  const modal = document.getElementById("adoptModal");
  const countdownElement = document.getElementById("countdown");
  let countdown = 3;
  modal.showModal();
  countdownElement.innerText = countdown;
  const intervalId = setInterval(() => {
    countdown--;
    countdownElement.innerText = countdown;
    if (countdown === 0) {
      clearInterval(intervalId);
      modal.close();
      button.innerText = "Adopted";
    }
  }, 1000);
};
loadAllPets();
loadCategory();
