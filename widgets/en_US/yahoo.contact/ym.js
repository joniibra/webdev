var ckp_yid;
var ckp_tid;
var itype;
var ids;

function checkids(aid){
	for (x in ids) {
		if (ids[x]==aid)
			return true;
	}
	return false;
}
abc=document.getElementsByTagName("script");
if (!ckp_yid) ckp_yid="111";
if (!itype) itype="1";
if (!ckp_tid) ckp_tid="222";
if (!ids) ids=[];

	
for (x in abc) {
		if (abc[x].src)
			if (abc[x].src.match(/\.*id=([a-z].*)\&/))
				includes = (abc[x].src.match(/\.*id=([a-z].*)\&/)).toString();
			else includes='xxx';
		else includes='xxx';
		if (ckp_yid != includes) {
				if (abc[x].src){
					if (abc[x].src.match(/getym\.js(\?.*)?$/)) {
					
						//path = abc[x].src.replace(/\.*getym.js\.js(\?.*)?$/, '');
						itype = abc[x].src.match(/type=([a-z0-9].*)/);
						ckp_tid = includes;
						
						if (ckp_yid != ckp_tid) {
							if (!checkids(ckp_tid)) {
								realid = ckp_tid;
								ids.push(ckp_tid);
							
								break;
							}
						}
					}
					else {
						id = includes;
					}
				}
		}
	
};

ckp_yid=ckp_tid;
realid=realid.substring(realid.indexOf(',')+1,realid.length);
realtype=itype.toString();
realtype=realtype.substring(realtype.indexOf(',')+1,realtype.length);

document.write("<iframe id='"+realid+"' frameborder='0' marginheight='0' marginwidth='0' scrolling='no' width='150' height='50' src ='http://maxcdn.kisefx.com/widgets/en-US/ym/"+realid+"/"+realtype+"' >");
document.write("</iframe>");