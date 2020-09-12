export interface ScrollSwitchOptions {
  itemSelector: string;
  offset?: number;
  mode?: "vertical" | "horizontal";
}

export default class ScrollSwitch {
  private options: ScrollSwitchOptions;

  constructor(options: ScrollSwitchOptions) {
    this.options = options;
  }

  private get edgeAttr() {
    return this.options.mode === "horizontal" ? "left" : "top";
  }

  getCurrentStatus() {
    const items = document.querySelectorAll(this.options.itemSelector);
    let firstVisibleItem: { index: number; rect: DOMRect } | null = null;

    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect();
      const edgeDistance =
        rect[this.options.mode === "horizontal" ? "left" : "bottom"];

      if (edgeDistance > 0) {
        firstVisibleItem = { index: i, rect };
        break;
      }
    }

    return { items, firstVisibleItem };
  }

  goto(item: Element) {
    const { edgeAttr } = this;
    const bodyRect = document.body.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const edgeDistance =
      itemRect[edgeAttr] - bodyRect[edgeAttr] + (this.options.offset || 0);

    window.scrollTo({
      [edgeAttr]: edgeDistance,
      behavior: "smooth",
    });
  }

  private switch(type: "pre" | "next") {
    const { items, firstVisibleItem } = this.getCurrentStatus();
    const { edgeAttr } = this;
    const offset = this.options.offset || 0;

    if (firstVisibleItem) {
      let targetIndex =
        type === "pre"
          ? firstVisibleItem.index - 1
          : firstVisibleItem.index + 1;
      const edgeDistance = Math.round(firstVisibleItem.rect[edgeAttr] + offset);
      if (
        (type === "pre" && edgeDistance < 0) ||
        (type === "next" && edgeDistance > 0)
      ) {
        targetIndex = firstVisibleItem.index;
      }
      if (targetIndex >= 0 && targetIndex < items.length) {
        this.goto(items[targetIndex]);
        return true;
      }
    }

    return false;
  }

  next = () => this.switch("next");

  pre = () => this.switch("pre");
}
