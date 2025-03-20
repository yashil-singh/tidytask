import { addClassName, removeClassName } from "@js/utils";

export const toggleCategoryExpand = (id) => {
  const categoryContainer = document.querySelector(
    `[data-category-container-id="${id}"]`,
  );

  if (!categoryContainer) return;

  if (categoryContainer.classList.contains("active")) {
    addClassName(categoryContainer, "closing");

    setTimeout(() => {
      removeClassName(categoryContainer, "active", "closing");
    }, 300);
  } else {
    addClassName(categoryContainer, "active");
  }
};

export const addAccordion = (button) => {
  button.addEventListener("click", (e) => {
    const categoryId = e.currentTarget.getAttribute("data-category-id");
    toggleCategoryExpand(categoryId);

    if (button.classList.contains("chevron-rotated")) {
      button.classList.toggle("chevron-rotate-back");

      setTimeout(() => {
        button.classList.toggle("chevron-rotate-back");
        button.classList.toggle("chevron-rotated");
      }, 300);
    } else {
      button.classList.toggle("chevron-rotating");

      setTimeout(() => {
        button.classList.toggle("chevron-rotating");
        button.classList.toggle("chevron-rotated");
      }, 300);
    }
  });
};
