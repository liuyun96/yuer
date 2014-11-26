svn update .
mvn clean compile
mvn war:exploded
cp -R target/yuer/WEB-INF/classes/com /mnt/webapp/yuertest/WEB-INF/classes/
cp -R target/yuer/templates /mnt/webapp/yuertest/
cp -R target/yuer/scripts /mnt/webapp/yuertest/
cp -R target/yuer/styles /mnt/webapp/yuertest/
cp -R target/yuer/images /mnt/webapp/yuertest/