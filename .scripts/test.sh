tsc -p tsconfig.test.json

THECAMP_ID=$THECAMP_ID THECAMP_PW=$THECAMP_PW .scripts/prepareEnvs.sh

yarn node --experimental-vm-modules $(yarn bin jest)

rm -rf __tests__