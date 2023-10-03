
working embed:
`java -jar openstego.jar embed -a randomlsb -mf hash.txt -cf original_image.png -sf test.png`
working extract:
 `java -jar openstego.jar extract -sf test.png -xd ./decoded/`
NB: an empty file named the name of the expected output must be in the output directory



Tests:
java -jar openstego.jar embed -a randomlsb -mf signature.json -cf original_image.png -sf test.png
