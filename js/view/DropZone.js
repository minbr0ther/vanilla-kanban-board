import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
        <div class="kanban__dropzone"></div>
    `).children[0];

    // 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함.
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("kanban__dropzone--active");
    });

    // 드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날 때 발생함.
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
    });

    // 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생함.
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      // drop이 되는 column 전체, id
      const columnElement = dropZone.closest(".kanban__column");
      const columnId = Number(columnElement.dataset.id);

      // drop이 되는 column 전체의 dropZones 가져오기
      const dropZonesInColumn = Array.from(
        columnElement.querySelectorAll(".kanban__dropzone")
      );

      // dropZones중에서 event가 발생된 dropZone의 index 파악
      const droppedIndex = dropZonesInColumn.indexOf(dropZone);

      // drag되고 있는 item의 id
      const itemId = Number(e.dataTransfer.getData("text/plain"));

      // drag되고 있는 item의 element
      const droppedItemElement = document.querySelector(
        `[data-id="${itemId}"]`
      );

      // event가 발생된 dropZone의 부모
      //  - dropZone 부모가 'kanban__column-items' or 'kanban__item'
      const insertAfter = dropZone.parentElement.classList.contains(
        "kanban__item"
      )
        ? dropZone.parentElement
        : dropZone;

      // 원래 자리에 놓으면 무시
      if (droppedItemElement.contains(dropZone)) return;

      // UI 변경
      insertAfter.after(droppedItemElement);

      // localStorage저장소(DB) 변경
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex,
      });
    });

    return dropZone;
  }
}
