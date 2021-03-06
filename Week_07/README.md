# week07学习笔记

## JavaScript
- Atom
- Expression
- Statement
- Structure
- Program/Module

## 运算式和表达式  Statement

### Grammer

1. Grammer Tree vs Priority  语法树和运算符，优先级的关系
1. Left hand side & Right hand side 运算符的左值和右值的区别

### Runtime

1. Type converition 类型转换
1. Reference 引用类型

四则运算，乘除的优先级比加减的优先级高，括号的优先级比乘除更高。构造语法树时，乘除会优先形成更小一级的语法结构。加减形成更高一级的语法结构。运算符的优先级会影响到语法树的构成。在JS语法中，用产生式来描述运算符的优先级的。

### Expressions

运算符优先级最高的是Member运算，是一个分级的名称
- a.b 成员访问
- a[b] 成员访问
- foo `string` 反引号的字符串前面加一个函数名，会把反引号的字符串拆开，传进函数作为参数
- super.b  super关键字，只有在 class的构造函数中才可以使用
- super['b']
- new.target 和Member优先级一致的
- new foo()  带括号的new 的优先级更高

New运算符，不带括号的New 优先级更低
- new Foo

Call Expressions 函数调用，优先级低于Member运算和New运算
- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`

Left hand side 依据是能不能放到等号左边

Right hand Expression 不能放到等号左边的：

Update Expression
- ++ a
- -- a
- a ++
- a --
- ++ a ++
- -- (a --)

单目运算符 Unary
- delete a.b
- void foo()
- typeof a
- + a (a 如何是字符串的话，会发生类型转化，表达式是类型转换的大户)
- - a
- ~ a 位运算，把一个整数按位取反，如果不是整数，则强制转为整数
- ! a
- await a

Exponental JS 唯一的右结合运算符
- ** 表示乘方
- 3**2**3
- 3**（2**3）

Multiplicative: * / % 乘除运算，会发生类型转换

Additive: + - 加减运算

Shift: << >> >>>   位运算（移位运算）

Relationship: < > <= >= instanceof in

Equality: == != === !=== (建议不用双等号)

Bitwise: & ^ |

Logical: && || 逻辑运算，短路原则

Conditional: ?:  唯一的三目运算符，也是有短路逻辑


**Reference**

引用类型是存在于JS运行时的一种类型，不属于7种基本类型之一。称作标准中的类型，而不是语言中的类型。
- Object
- key  object.key取出来的是属性的引用，key可以是String，也可以是symbol。

如果做加减运算，就直接把引用类型解引用，像普通变量一样去使用。JS就是用引用类型来处理以下操作的。
- delete
- assign

## 类型转化 Type Convertion

- a + b
- "false" == false
- a[o] = 1

主要有装箱转化和拆箱转化

Unboxing
- ToPremitive
- toString vs valueOf
- Symbol.toPrimitive

```
var o = {
  toString() { return "2"},
  valueOf() { return 1},
  [Symbol.toPrimitive]() {return 3},
}

var x = {}
x[o] = 1
console.log("x" + o)
```



