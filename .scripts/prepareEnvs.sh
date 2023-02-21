echo "prepareEnvs.sh $PWD"

if [ $THECAMP_ID ]; then
  echo "THECAMP_ID=$THECAMP_ID\nTHECAMP_PW=$THECAMP_PW" >> .env
  echo "THECAMP_ID=$THECAMP_ID\nTHECAMP_PW=$THECAMP_PW" >> examples/.env

  if [ -d "dist" ]; then
    echo "THECAMP_ID=$THECAMP_ID\nTHECAMP_PW=$THECAMP_PW" >> dist/.env
  fi
else
  echo "Envs not set"
fi