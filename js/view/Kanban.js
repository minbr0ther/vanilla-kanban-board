import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    this.$root = root;
    this.render();
  }

  static columns() {
    return [
      {
        id: 1,
        title: "Not Started",
      },
      {
        id: 2,
        title: "In Progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }

  render() {
    Kanban.columns().forEach((column) => {
      const columnView = new Column(column.id, column.title);

      this.$root.append(columnView.$root);
    });
  }
}
