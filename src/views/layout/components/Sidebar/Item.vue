<template>
  <span>
    <svg-icon :icon-class="icon"/>
    <span slot="title">
      {{ title }}
      <el-badge
        v-if="path == '/users' && operation_tasks.user && operation_tasks.user.property_application > 0"
        :value="operation_tasks.user.property_application"
        :max="99"
        class="linhuiba-badge" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    path: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    operation_tasks() {
      return this.$store.state.user.operation_tasks
    }
  },
  mounted() {

  }
  /* render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  } */
}
</script>
