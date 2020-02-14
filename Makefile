production:
	npm run compile
	npm run coverage
	npm run flatting
	npx prettier --write dist/*.sol

deploy-live:
	truffle migrate --reset --network live

deploy-kovan:
	truffle migrate --reset --network kovan

deploy-ropsten:
	truffle migrate --reset --network ropsten

deploy-rinkeby:
	truffle migrate --reset --network rinkeby

deploy-development:
	truffle migrate --reset --network development