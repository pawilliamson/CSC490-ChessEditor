#!/bin/sh
# Used to have 'empty' directories for git.

cd ..
for dir in $(find . -type d -empty  -not -path "./.git/*" -not -name .git) 
do	
	cd $dir 
	echo $dir
	touch .keep
	cd -
done
for path in $(find . -name .keep)
do 
	parent=$(dirname $path)
	echo $path
	cd $parent 
	files=$( find .  )
	num=0
	echo Checking
	for file in $files
	do 
		echo $file
		num=$(($num + 1))
	done
	echo $files
	echo $num
	if [[ $num -gt 2 ]]; then
		rm .keep
		echo "Removed:" $path
	fi
	cd -
done



