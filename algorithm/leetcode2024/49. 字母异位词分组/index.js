// 49. 字母异位词分组
// 中等
// 相关标签
// 相关企业
// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 示例 1:

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = [""]
// 输出: [[""]]
// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]

// 方法一 排序
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
	const hashTable = new Map()
	for (let i = 0; i < strs.length; i++) {
		const key = strs[i].split('').sort().join('')

		if (hashTable.has(key)) {
			hashTable.set(key, [...hashTable.get(key), strs[i]])
		} else {
			hashTable.set(key, [strs[i]])
		}
	}

	return [...hashTable.values()]
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
/**
 *
 * @param {string[]} strs
 */
function groupAnagram2(strs) {
	const map = {}

	for (let str of strs) {
		const count = new Array(26).fill(0)
		for (let c of str) {
			count[c.charCodeAt() - 'a'.charCodeAt()]++
		}
		map[count] ? map[count].push(str) : (map[count] = [str])
	}

	return Object.values(map)
}

console.log(groupAnagram2(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
