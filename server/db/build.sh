DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
sh $DIR/destroy.sh
mongoimport --db sais --collection user --file $DIR/data/users.json --jsonArray