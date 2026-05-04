 //  when hover then change the background images
document.addEventListener("DOMContentLoaded", function() {
    const customApart = document.querySelector('.custom-apart');
    const hoverContainer = document.querySelector('.custom-hover-img-container');

    // Only add event listeners if elements exist
    if (customApart && hoverContainer) {
        customApart.addEventListener('mouseenter', function() {
            hoverContainer.style.background = 
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/hero_bg_img.jpg') no-repeat center center / cover";
        });

        customApart.addEventListener('mouseleave', function() {
            hoverContainer.style.background = 
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/bb.jpg') no-repeat center center / cover";
        });
    }
});

// get all li inside #menu to change the list icon
document.querySelectorAll("#menu li").forEach(function(item) {
  item.addEventListener("click", function() {
    // remove active from all
    document.querySelectorAll("#menu li").forEach(li => li.classList.remove("active"));
    // add active to clicked one
    this.classList.add("active");
  });
});

// choose category then changes the images
  document.querySelectorAll("#menu li a").forEach(link => {
  link.addEventListener("click", function () {
    // Remove active class from all li
    document.querySelectorAll("#menu li").forEach(li => li.classList.remove("active"));
    this.parentElement.classList.add("active");

    // Hide all custom rows
    document.querySelectorAll(".custom-room-row, .custom-hall-row, .custom-kitchen-row, .custom-elevation-row")
      .forEach(row => row.style.display = "none");

    // Show ALL rows matching the filter
    const target = this.getAttribute("data-filter");
    document.querySelectorAll(target).forEach(row => {
      row.style.display = "flex"; // flex keeps Bootstrap row alignment
    });
  });
});

// home page ul list icon 
document.querySelectorAll(".custom-list li").forEach(li => {
  li.addEventListener("click", () => {
    document.querySelector(".custom-list li.active")?.classList.remove("active");
    li.classList.add("active");
  });
});

// Default: show only the active one --all hall bed room
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("#menu a");
  const allRows = document.querySelectorAll(
    ".custom-room-row, .custom-hall-row, .custom-kitchen-row, .custom-elevation-row"
  );
  const allSection = document.querySelector(".custom-all-row");

  function showRows(filter) {
    allRows.forEach(row => (row.style.display = "none"));
    if (allSection) allSection.style.display = "none";

    if (filter === "all") {
      if (allSection) allSection.style.display = "block";
      allRows.forEach(row => (row.style.display = "flex"));
    } else {
      document.querySelectorAll(`.${filter}`).forEach(row => (row.style.display = "flex"));
    }
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach(l => l.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
      showRows(this.getAttribute("data-filter"));
    });
  });

  // Trigger active menu item on load
  const activeLink = document.querySelector("#menu li.active a");
  if (activeLink) showRows(activeLink.getAttribute("data-filter"));
});
// all menu function in index page(city, area)
document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city");
  const areaSelect = document.getElementById("area");
  const heading = document.querySelector(".text_popular");

  // All rows (cards)
  const filters = document.querySelectorAll(".custom-filter-row");

  // Show all rows initially
  function showAll() {
    filters.forEach(row => row.classList.remove("d-none"));
  }

  // Hide all rows
  function hideAll() {
    filters.forEach(row => row.classList.add("d-none"));
  }

  // Define city areas
  const areas = {
    coimbatore: [
      { value: "rs_puram", text: "RS Puram" },
      { value: "gandhipuram", text: "Gandhipuram" }
    ],
    chennai: [
      { value: "t_nagar", text: "T Nagar" },
      { value: "velachery", text: "Velachery" }
    ],
    bangalore: [
      { value: "whitefield", text: "Whitefield" },
      { value: "koramangala", text: "Koramangala" }
    ]
  };

  // Initially show everything and hide heading
  showAll();
  heading.style.display = "none";

  // Populate area dropdown when city changes
  citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    areaSelect.innerHTML = '<option value="">-- Select Area --</option>';
    areaSelect.disabled = true;

    if (city && areas[city]) {
      areas[city].forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.value;
        opt.textContent = a.text;
        areaSelect.appendChild(opt);
      });
      areaSelect.disabled = false;
    }

    // Reset display
    showAll();
    heading.style.display = "none";
  });

  // Filter when area is selected
  areaSelect.addEventListener("change", () => {
    const city = citySelect.value;
    const area = areaSelect.value;

    if (!city || !area) {
      showAll();
      heading.style.display = "none";
      return;
    }

    hideAll();

    // Show only matching rows
    const matches = document.querySelectorAll(`.custom-filter-row[data-city="${city}"][data-area="${area}"]`);
    matches.forEach(row => row.classList.remove("d-none"));

    // Update heading
    if (matches.length > 0) {
      heading.textContent = `Popular homes in ${areaSelect.selectedOptions[0].text}, ${citySelect.selectedOptions[0].text}`;
    } else {
      heading.textContent = "No results found";
    }
    heading.style.display = "block";
  });
});


// drop down city area in home pgae
document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("carsLabel");
  const selected = document.getElementById("carsSelected");
  const options = document.getElementById("carsOptions");
  const filterRow = document.querySelector(".filter-row");

  // Remove Bootstrap's d-none so JS can control visibility
  if (filterRow.classList.contains("d-none")) {
    filterRow.classList.remove("d-none");
    filterRow.style.display = "none"; // start hidden
  }

  // Function to toggle dropdown
  const toggleDropdown = () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
  };

  // Open dropdown when clicking label or selected box
  label.addEventListener("click", toggleDropdown);
  selected.addEventListener("click", toggleDropdown);

  // Select an option
  options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      options.style.display = "none";
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!label.contains(e.target) && !selected.contains(e.target) && !options.contains(e.target)) {
      options.style.display = "none";
    }
  });
});

// in details page view all accordion
    document.addEventListener("DOMContentLoaded", () => {
  const viewAllBtn = document.getElementById("view_all_btn");
  const scroll1 = document.getElementById("scrollContainer");
  const scroll2 = document.getElementById("scrollContainer2");

  let expanded = false;

  viewAllBtn.addEventListener("click", () => {
    expanded = !expanded;

    if (expanded) {
      scroll2.style.display = "block";   // show 2nd container
      viewAllBtn.textContent = "View Less"; // change button text
    } else {
      scroll2.style.display = "none";    // hide 2nd container
      viewAllBtn.textContent = "View All";
    }
  });
});

// in details page li menu active css
document.addEventListener("DOMContentLoaded", function() {
    var menuItems = document.querySelectorAll("#menu-details li");
    menuItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Remove 'active' from all items
            menuItems.forEach(function(i) { 
                i.classList.remove("active"); 
            });
            this.classList.add("active");
        });
    });
});

// In details page in mobile view place nearby - view all then view less button
document.addEventListener("DOMContentLoaded", () => {
  const viewAllBtn = document.getElementById("view_all_btn");
  const scrollContainers = document.querySelectorAll(".scroll-container");

  viewAllBtn.addEventListener("click", () => {
    scrollContainers.forEach(container => {
      container.classList.toggle("show-all");
    });

    // toggle button text
    if (viewAllBtn.textContent === "View All") {
      viewAllBtn.textContent = "View Less";
    } else {
      viewAllBtn.textContent = "View All";
    }
  });
});

// in details page menu active text color 
// Wait for the page to load
document.addEventListener("DOMContentLoaded", function() {
    // Select all menu <li> items
    var menuItems = document.querySelectorAll("#menu-details li");

    // Add click event to each item
    menuItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Remove 'active' from all items
            menuItems.forEach(function(i) { 
                i.classList.remove("active"); 
            });

            // Add 'active' to the clicked item
            this.classList.add("active");
        });
    });
});

//js if click share img then copy the current page url in details page 
document.querySelectorAll(".shareImg").forEach(img => {
  img.addEventListener("click", function () {
    // Get current page URL
    const currentUrl = window.location.href;

    // Copy to clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  });
});

// in details page enable disable img changes
document.querySelectorAll(".col").forEach(el => {
  const img = el.querySelector("img");
  const name = el.dataset.name; // e.g., "tv", "fan", "light", "ac"

  if (el.classList.contains("enable")) {
    img.src = `img/${name}_enable.png`;
  } else if (el.classList.contains("disable")) {
    img.src = `img/${name}_disable.png`;
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();

      // Wait for Bootstrap collapse animation (if any)
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (!target) return;

        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300); // wait 300ms for navbar collapse to finish
    }
  });
});
