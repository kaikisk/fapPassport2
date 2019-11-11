var fileObj = new File( "./temp.txt" );

fileObj.open( "w" );
fileObj.write( "ABC" );
fileObj.close();
fileObj = null;
