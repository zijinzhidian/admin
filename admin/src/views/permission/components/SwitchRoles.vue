<template>
	<div>
		<div>{{ $t('permission.roles') }}: {{ roles }}</div>
		{{ $t('permission.switchRoles') }}:
	</div>
</template>

<script>
	export default {
		computed: {
			roles() {
				return this.$store.getters.roles
			}
		}
	}
</script>