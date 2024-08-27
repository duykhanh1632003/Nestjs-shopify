// Utility này cho phép bạn loại bỏ một hay nhiều type từ union type của một thuộc tính khi tạo mới từ type có sẵn

type TestNumberOrString = number | string

type RemoveString = Exclude<TestNumberOrString, string>
// nó sẽ tương tự như sau:
type RemoveString = number;
