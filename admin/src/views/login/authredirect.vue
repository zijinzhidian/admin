<script>
	export default {
		name: 'authredirect',
		created() {
			console.log(456)
			const hash = window.location.search.slice(1)
      window.opener.location.href = window.location.origin + '/login#' + hash
      window.close()
		}
	}
</script>