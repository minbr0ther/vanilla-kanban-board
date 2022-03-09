const defaultState = [
  {
    id: 1,
    items: [],
  },
  {
    id: 2,
    items: [],
  },
  {
    id: 3,
    items: [],
  },
];

export default class KanbanAPI {}

function read() {
  const json = localStorage.getItem("kanban-data");

  if (!json) return defaultState;

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
