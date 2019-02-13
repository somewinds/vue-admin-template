// 常用正则表达式

// 手机和座机
// export const TEL_REG = /^1[2345789]\d{9}$|^(\d{3,4}-?)?\d{7,8}(-\d{1,4})?$/;
export const TEL_REG = /^1[0-9]{10}$|^(\d{3,4}-?)?\d{7,8}(-\d{1,4})?$/

// 11位手机号码
// export const MOBILE_REG = /^1[2345789]\d{9}$/;
export const MOBILE_REG = /^1[0-9]{10}$/

// 密码匹配
export const PASSWORD_REG = /^[0-9a-zA-Z]{6,30}$/

// 中英文最少一位
export const WORLD_REG = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/

// 邮箱检测
export const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

// 限制长度为 n 的中英文
export const WORLD_TEN_REG = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1 , 10}$/

// textarea框检测html标签
export const WORLD_HTML_REG = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>|\s+)/g

// 正整数最少一位
export const POSITIVE_INT_REG = /^\d+$/

// 正整数
export const POSITIVE_REG = /^\d$/

// 正整数1-2位
export const INT_TWO_REG = /^\d{1,2}$/

// 正整数4-6位
export const INT_SIX_REG = /^\d{4,6}$/

// 正整数4位
export const INT_FOUR_REG = /^\d{4}$/

// 整数或者小数
export const FLOAT_REG = /^\d+(\.\d{1,2})?$/

// 身份证号
export const USRT_REG = /^\d{17}[\d|x]$|^\d{15}$/

// 数字字母6位
export const CAPTCHA_REG = /^[a-zA-Z0-9]{6}$/

// 6位数字支付密码及验证码
export const PIN_REG = /^\d{6}$/

// 整数
export const INT_NUMBER_REG = /^(([1-9]\d*)|0)$/

// 整数除0外
export const INT_NUMBER_WITHOUT_0_REG = /^(([1-9]\d*))$/

// 两位小数点小数
export const TWO_DECIMAL_NUMBER_REG = /^([1-9]\d*(\.?|\.\d{1,2})?|0\.?(\d{1,2})?)$/

// 两位小数点小数且大于0
export const TWO_DECIMAL_NUMBER_WITHOUT_0_REG = /^([1-9]\d*(\.?|\.\d{1,2})?|0\.(([0-9][1-9])|([1-9][0-9])))$/

// 100以内的两位小数点小数
export const TWO_DECIMAL_NUMBER_WITHIN_100_REG = /^([1-9]\d?(\.?|\.\d{1,2})?|0\.?(\d{1,2})?|100(\.?|\.[0]{1,2}))$/

// 非全空字符串（其中必定包含一个除空格外的一个字符）（单行）
export const NON_FULL_EMPTY_STRING = /^.*\S+.*$/

// 非全空字符串（其中必定包含一个除空格外的一个字符）（多行）
export const NON_FULL_EMPTY_STRING_MULTILINE = /^((\s*)|(.*))*\S+((\s*)|(.*))*$/

// 100以内的正整数1-2位
export const INT_TWO_WITHIN_100_REG = /^((\d{1,2})|100)$/

// 至少一位整数数字，如 0 01 123 00121
export const INTEGER_LIMIT_ONE_REG = /^\d+$/
