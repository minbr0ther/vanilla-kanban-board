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

export default class KanbanAPI {
  static getItems(columnId) {
    const column = read().find((column) => column.id === columnId);

    if (!column) return [];

    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();

    const column = data.find((column) => column.id === columnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content,
    };

    if (!column) throw new Error("Column does not exist");

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProps) {
    const data = read();

    // 입력받은 itemId를 사용해서 일치하는 item과 column을 반환
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id === itemId);

        if (item) return [item, column];
      }
    })();

    if (!item) throw new Error("Item does not exist");

    // 새로 받은 newProps에 content가 있으면 업데이트 (없으면 그대로)
    item.content = newProps.content ? newProps.content : item.content;

    // 새로 받은 newProps에 columnId와 position가 있는지 체크
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find(
        (column) => column.id === newProps.columnId
      );

      if (!targetColumn) throw new Error("Target Column not found");

      // 기존에 있던 항목 삭제
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // 입력받은 새로운 포지션으로 아이템 삽입
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }

  static deleteItem(itemId) {
    const data = read();

    for (const column of data) {
      const item = column.items.find((item) => item.id === itemId);

      item && column.items.splice(column.items.indexOf(item), 1);
    }

    save(data);
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");

  if (!json) return defaultState;

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
