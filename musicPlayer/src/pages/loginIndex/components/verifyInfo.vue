<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-18 13:55:05
 * @Update: 2019-08-26 14:30:37
 * @Update log: 更新日志
 -->
<template>
  <div class="container">
    <div class="info">
      <p>验证码已发送至</p>
      <p>
        <span>+86</span>
        <span>
          {{phone1}}
          <span class="middle">****</span>
          {{phone2}}
        </span>
      </p>
    </div>
    <div class="renew">重新获取</div>
  </div>
</template>

<script>
import { getPhone } from 'utils/getPhone'
import api from 'api'
export default {
  name: 'verifyInfo',
  // 通过 url 传过来的手机号，存取后进行验证码发送操作
  data () {
    return {
      phone1: 133,
      phone2: 1234
    }
  },
  methods: {
    /**
     * 发送验证码
     */
    _sendVerify () {
      let phone = getPhone()
      this.showPhone(phone)
      // 发送验证码
      api.sendVerifyFn(phone)
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
    },
    /**
     * 截取手机号码进行页面显示
     */
    showPhone (phone) {
      this.phone1 = Array.from(phone).slice(0, 3).join('')
      this.phone2 = Array.from(phone).slice(-4).join('')
    },
    /**
     * 验证验证码
     */
    verify () {
      let phone = getPhone()
      let captcha = '111'
      api.verifyFn(phone, captcha)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  },
  created () {
    this._sendVerify()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  p:first-child {
    margin-bottom: 0.3rem;
  }
  span {
    color: #ccc;
    .middle {
      vertical-align: -3px;
    }
  }
  .renew {
    color: #1a73e8;
    cursor: pointer;
  }
}
</style>
