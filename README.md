# scroll-switch

简单来说，它就是用来滚动切换列表项的。

## 适用场景

当某些列表页希望用户每次只聚焦于单个列表项，但又不是每个列表项都是占满屏幕时就不太适合使用全屏滚动方案了。

所以，可以在保留原有滚动查看的基础上再增加一个上下切换的功能，仅作为滚动查看的辅助工具而存在看起来就可以很好的满足该种需求。

## 特性

- next、pre 会根据当前列表滚动位置智能切换到最符合用户预期的条目
- 相对于 [scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView) 支持设置 offset，可以更好的控制滚动目标位置

## 演示

[scroll-switch.mp4](https://aweiu.com/documents/scroll-switch/scroll-switch.mp4)

## 文档

https://aweiu.com/documents/scroll-switch/
