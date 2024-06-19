// 20. 有效的括号
// 已解答
// 简单
// 相关标签
// 相关企业
// 提示
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

/**
 * @param {string} s
 * @return {boolean}
 */
function isValidate(s) {
	const stack = []
	for (let i = 0; i < s.length; i++) {
		switch (s[i]) {
			case '{':
			case '[':
			case '(':
				stack.push(s[i])
				break
			case ']':
				if (stack[stack.length - 1] === '[') {
					stack.pop()
				} else {
					return false
				}
				break
			case ')':
				if (stack[stack.length - 1] === '(') {
					stack.pop()
				} else {
					return false
				}
				break
			case '}':
				if (stack[stack.length - 1] === '{') {
					stack.pop()
				} else {
					return false
				}
				break
		}
	}

	return stack.length === 0
}

console.log(isValidate('()'))
