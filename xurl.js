XURL_js=true;
var XURL = {
	flagDebug: false,
	rssTypeList: "parser",
	NoP: 1,
	error: 0,
	phpGate: "",
	redirVK: true,
	icoFolder: "images/menu_icon/icon_folder.png",
	icoMedia: "images/menu_icon/icon_video.png",
	icoPList: "images/menu_icon/icon_list.png",
	icoUSB: "images/menu_icon/icon_usb.png",
	//Ссылки на следующую и предыдущую страницы
	title: "",
	lock: "",
	search: "",
	vk_title: "",
	vk_format: "",
	vk_format_name: "",
	next_page_url: "",
	next_page_app: "",
	prefixURL: "",
	prefixIMG: "",
	kBUrl: "",
	kEUrl: "",
	kBDirImg: "",
	kBImg: "",
	kEImg: "",
	kDesBImg: "",
	kDesEImg: "",
	kBDes: "",
	kEDes: "",
	kBTit: "",
	kETit: "",
	kLogo: "",
	kBDisNeP: "",
	kBNeP: "",
	kENeP: "",
	//определение страницы со стримом
	kPStm: "",
	pref_IMG: "",
	kPBIm: "",
	kPEIm: "",
	kPBDs: "",
	kPEDs: "",
	prefixSRL: "",
	kPBUr: "",
	kPEUr: "",
	kUAdd: "",
	kEAdd: "",
	kPBTt: "",
	kPETt: "",
	Logo_fs: "",
	
	NoP_fs: 0,
	/*конец Блок параметров для портала*/
	prefixXML: "<![CDATA[",
	endedXML: "]]>",
	prefixTAG: "<a href=\'",
	endedTAG: "\'>",
	prefixImg: "<img src=\'",
	endedImg: "'/>",
	endedIco: "", //определяем ниже при инициализации
	//строка, куда соберем список
	outTXT: "",
   //входящая в парсер ссылка
	mURL: "",
	RWtitle: "",
	mSecReq: 60000,//таймаут запроса в миллисекундах
	fMode: false,//режим обмена данными (асинхронный=true синхронный=false)
	fCancel: false,//флаг отмены запроса по таймауту
	fComplete: false,//флаг завершения формирования XML плейлиста
	nStart: 0,//начальный символ поиска в ответе нужных данных
	keyUSB: "http://local",
	mntUSB: "/dtv/usb",
	mntUSB2: "/usb",
	arrUSB: ["sda1", "sdb1", "sdc1", "sdd1", "sda", "sdb", "sdc", "sdd", "sda2", "sda3", "sda4"],
	arrUSR: ["/mtd_rwdata", "/mtd_rwcommon", "/mtd_down"],
	arrVideoExt: [".avi", ".asf", ".asx", ".webm", ".3gp", ".3g2", ".3gp2", ".3gpp", ".flv", ".mp4", ".mp4v", ".m4v", ".m2v", ".m2ts", ".m2t", ".mp2v", ".mov", ".mpg", ".mpe", ".mpeg", ".mkv", ".swf", ".mts", ".wm", ".wmx", ".wmv", ".vob", ".iso", ".f4v", ".ts", "?feature=player_embedded"],
	arrImageExt: [".png", ".gif", ".jpg", ".jpeg", ".bmp", ".ico", ".fpx", ".ilbm", ".jbig", ".pcx", ".pnm", ".psd", ".raw", ".tga", ".wbmp", ".xcf", ".exr", ".icer", ".jp2", ".pgf", ".tiff", ".webp", ".apng", ".mng", ".ai", ".cdr", ".emf", ".eps", ".ps", ".svg", ".wmf", ".xps", ".swf", ".3ds", ".vrml", ".x3d"],
	arrAudioExt: [".mp3", ".dts", ".ac3", ".wav", ".wma", ".aiff", ".ape", ".au", ".dsd", ".dxd", ".mlp", ".flac"],
	arrTrashExt: [".srt", ".rar", ".arj", ".doc", ".docx", ".xls", ".xlsx"],
	arrPListExt: [".xml",".m3u"],
	//двумерный массив строк, которые нужно заменить в тексте - первый вариант на второй
	arrReplWordsFrwd: [["", ""]],
	arrReplWordsBkwd: [["", ""]],
	arrReplWordsTitl: [["", ""]],
	arrReplWordsImge: [["", ""]],
	arrReplWordsDesc: [["", ""]],
	arrReplWordsFile: [["", ""]],
	arrReplWordsPortal: [["", ""]],
	//массив строк-масок регулярных выражений, подлежащих удалению из текста
	arrDelWords: [""],
	//Маски поиска-парсинга
	sPatTag: "<[^<^>]*>",
	xmlHTTP: null,//объект работы с интернет
	timeout: null,
	fHasXML: null,//интервальная проверка окончания формирования плейлиста
	xmlObjt: null//XML объект для выдачи результата
}

var XURLdata= new Array();

function XURLc(){
    this.title=""; 
    this.text="";
	this.epg_id="";
	this.fav_id="";
    this.img=null;
    this.video="";
	this.mode="";
    this.xml="";
    this.ico="";
    this.app=null;
	this.block="";
}

var XURLdata_next= new Array();

function XURL_next(){
    this.title=""; 
    this.text="";
	this.epg_id="";
	this.fav_id="";
    this.img=null;
    this.video="";
    this.xml="";
	this.mode="";
    this.ico="";
    this.app=null;
	this.block="";
}

var video_title_Veterok;
YouTube_type=new Array();
YouTube_type[5]=[".flv","240p"]
YouTube_type[17]=[".3gp","144p"]
YouTube_type[18]=[".mp4","360p"]
YouTube_type[22]=[".mp4","720p"]
YouTube_type[34]=[".flv","360p"]
YouTube_type[35]=[".flv","480p"]
YouTube_type[36]=[".3gp","240p"]
YouTube_type[37]=[".mp4","1080p"]
YouTube_type[38]=[".mp4","2k"]
YouTube_type[43]=[".webm","360p"]
YouTube_type[44]=[".webm","480p"]
YouTube_type[45]=[".webm","720p"]
YouTube_type[46]=[".webm","1080p"]
YouTube_type[82]=[".mp4","360p/3D"]
YouTube_type[83]=[".mp4","480p/3D"]
YouTube_type[84]=[".mp4","720p/3D"]
YouTube_type[85]=[".mp4","1080p/3D"]
YouTube_type[100]=[".webm","360p/3D"]
YouTube_type[101]=[".webm","480p/3D"]
YouTube_type[102]=[".webm","720p/3D"]
YouTube_type[133]=[".mp4","240p/VO"]
YouTube_type[134]=[".mp4","360/VO"]
YouTube_type[135]=[".mp4","480p/VO"]
YouTube_type[136]=[".mp4","720p/VO"]
YouTube_type[137]=[".mp4","1080p/VO"]
YouTube_type[139]=[".mp4","96kb/s"]
YouTube_type[140]=[".mp4","128kb/s"]
YouTube_type[141]=[".mp4","256kb/s"]
YouTube_type[160]=[".mp4","144p/VO"]
YouTube_type[171]=[".webm","128kb/s"]
YouTube_type[172]=[".webm","256kb/s"]
YouTube_type[242]=[".webm","240p/VOX"]
YouTube_type[243]=[".webm","360p/VOX"]
YouTube_type[244]=[".webm","480p/VOX"]
YouTube_type[245]=[".webm","480p/VOX"]
YouTube_type[246]=[".webm","480p/VOX"]
YouTube_type[247]=[".webm","720p/VOX"]
YouTube_type[248]=[".webm","1080p/VOX"]
YouTube_type[264]=[".mp4","2k/VO"]
YouTube_type[266]=[".mp4","4k/VO"]
YouTube_type[271]=[".webm","2k/VOX"]
YouTube_type[272]=[".webm","4k/VOX"]
YouTube_type[278]=[".webm","144p"];

XURL.InitPortal = function(sURL,mode){
	if (sURL.toLowerCase().indexOf("ex.ua") >= 0){ //для EX.UA
		prefix = "http://www.ex.ua";
		this.lock="";
		this.title = "EX.UA";
	}else if (sURL.toLowerCase().indexOf("fs.to") >= 0 ||
			  sURL.toLowerCase().indexOf("brb.to") >= 0){ //для FS.UA
		prefix = "http://fs.to";
		this.lock="on";
		this.title = "FS.TO";
	}else if (sURL.toLowerCase().indexOf("cxz.to") >= 0){ //для FS.UA
		prefix = "http://cxz.to";
		this.lock="on";
		this.title = "CXZ.TO";
	}else if (sURL.toLowerCase().indexOf("uakino.net") >= 0){ //для UAKINO.NET
		prefix = "http://uakino.net";
		this.lock="on";
		this.title = "UAKINO.NET";
	}else if (sURL.toLowerCase().indexOf("uakino.tk") >= 0){ //для UAKINO.TK
		prefix = "http://uakino.tk";
		this.lock="on";
		this.title = "UAKINO.TK";
	}else if (sURL.toLowerCase().indexOf("tree.tv") >= 0){ //для tree.tv
		prefix = "http://tree.tv";
		this.lock="on";
		this.title = "TREE.TV";
	}else if (sURL.toLowerCase().indexOf("ofx.to") >= 0){ //для http://ofx.to
		prefix = "http://ofx.to";
		this.lock="on";
		this.title = "OFX.TO";
	}else if (sURL.toLowerCase().indexOf("www.zoomby.ru") >= 0){ //для http://www.zoomby.ru
		prefix = "http://www.zoomby.ru";
		this.lock="on";
		this.title = "ZOOMBY.RU";
	}else if (sURL.toLowerCase().indexOf("kino24.cc") >= 0){ //для http://kino24.cc
		prefix = "http://kino24.cc";
		this.lock="on";
		this.title = "KINO24.CC";
	}else if (sURL.toLowerCase().indexOf("www.youtube.com") >= 0){ //для www.youtube.com
		prefix = "http://www.youtube.com";
		this.lock="";
		this.title = "YOUTUBE";
	}else if (sURL.toLowerCase().indexOf("www.kinoxa-x.ru") >= 0){ //для www.kinoxa-x.ru
		prefix = "http://www.kinoxa-x.ru";
		this.lock="on";
		this.title = "KINOXA-X.RU";
	}else if (sURL.toLowerCase().indexOf("www.anibox.ru") >= 0){ //для www.anibox.ru
		prefix = "http://www.anibox.ru";
		this.lock="on";
		this.title = "ANIBOX.RU";
	}else if (sURL.toLowerCase().indexOf("hdrezka.tv") >= 0){ //для hdrezka.tv
		prefix = "http://hdrezka.tv";
		this.lock="on";
		this.title = "HDREZKA.TV";
	}else if (sURL.toLowerCase().indexOf("www.comedyportal.net") >= 0){ //для www.comedyportal.net
		prefix = "http://www.comedyportal.net";
		this.lock="on";
		this.title = "COMEDYPORTAL.NET";
	}else if (sURL.toLowerCase().indexOf("v720.ru") >= 0){ //для v720.ru
		prefix = "http://v720.ru";
		this.lock="on";
		this.title = "V720.RU";
	}else if (sURL.toLowerCase().indexOf("911.to") >= 0){ //для 911
		prefix = "http://911.to";
		this.lock="on";
		this.title = "911.TO";
	}else if (sURL.toLowerCase().indexOf("kinotochka.net") >= 0){ //для kinotochka.net
		prefix = "http://kinotochka.net";
		this.lock="on";
		this.title = "KINOTOCHKA.NET";
	}else if (sURL.toLowerCase().indexOf("www.kino-ussr.ru") >= 0){ //для www.kino-ussr.ru
		prefix = "http://www.kino-ussr.ru";
		this.lock="on";
		this.title = "KINO-USSR.RU";		
	}else if (sURL.toLowerCase().indexOf("online-serial.tv") >= 0){ //для online-serial.tv
		prefix = "http://online-serial.tv";
		this.lock="on";
		this.title = "ONLINE-SERIALS.TV";
	}else if (sURL.toLowerCase().indexOf("tushkan.net") >= 0){ //для tushkan.net
		prefix = "http://tushkan.net";
		this.lock="on";
		this.title = "TUSHKAN.NET";
	}else if (sURL.toLowerCase().indexOf("zagonka.ru") >= 0){ //для zagonka.ru
		prefix = "http://zagonka.ru";
		this.lock="on";
		this.title = "ZAGONKA.RU";
	}else if (sURL.toLowerCase().indexOf("kinoylei.org") >= 0){ //для kinoylei.org
		prefix = "http://kinoylei.org";
		this.lock="on";
		this.title = "KINOYLEI.ORG";
	}else if (sURL.toLowerCase().indexOf("lostfilmonline.ru") >= 0){ //для lostfilmonline.ru
		prefix = "http://lostfilmonline.ru";
		this.lock="on";
		this.title = "LOSTFILMONLINE.RU";
	}else if (sURL.toLowerCase().indexOf("kinomaxpro.com") >= 0){ //для kinomaxpro.com
		prefix = "http://kinomaxpro.com";
		this.lock="on";
		this.title = "KINOMAXPRO.COM";
	}else if (sURL.toLowerCase().indexOf("seasonvar.ru") >= 0){ //для seasonvar.ru
		prefix = "http://seasonvar.ru";
		this.lock="on";
		this.title = "SEASONVAR.RU";
	}else if (sURL.toLowerCase().indexOf("serials.tv") >= 0){ //для serials.tv
		prefix = "http://serials.tv";
		this.lock="on";
		this.title = "SERIALS.TV";
	}else if (sURL.toLowerCase().indexOf("multfilmchik.ru") >= 0){ //для multfilmchik.ru
		prefix = "http://multfilmchik.ru";
		this.lock="on";
		this.title = "MULTFILMCHIK.RU";
	}else if (sURL.toLowerCase().indexOf("amovies.tv") >= 0){ //для amovies.tv
		prefix = "http://amovies.tv";
		this.lock="on";
		this.title = "AMOVIES.TV";
	}else if (sURL.toLowerCase().indexOf("www.online-life.me") >= 0){ //для www.online-life.me
		prefix = "http://www.online-life.me";
		this.lock="on";
		this.title = "ONLINE-LIFE.ME";		
	}else if (sURL.toLowerCase().indexOf("gamebomb.ru") >= 0){ //для gamebomb.ru
		prefix = "http://gamebomb.ru";
		this.lock="";
		this.title = "GAMEBOMB.RU";
	}else if (sURL.toLowerCase().indexOf("online.anidub.com") >= 0){ //для online.anidub.com
		prefix = "http://online.anidub.com";
		this.lock="on";
		this.title = "ONLINE.ANIDUB.COM";
	}else if (sURL.toLowerCase().indexOf("www.moviki.ru") >= 0){ //для www.moviki.ru
		prefix = "http://www.moviki.ru";
		this.lock="on";
		this.title = "MOVIKI.RU";	
	}else if (sURL.toLowerCase().indexOf("moviki.tv") >= 0){ //для moviki.tv
		prefix = "http://moviki.tv";
		this.lock="on";
		this.title = "MOVIKI.TV";
	}else if (sURL.toLowerCase().indexOf("cinem.tv") >= 0){ //для cinem.tv
		prefix = "http://cinem.tv";
		this.lock="on";
		this.title = "CINEMA.TV";
	}else if (sURL.toLowerCase().indexOf("animedia.tv") >= 0){ //для ANIMEDIA.TV
		prefix = "http://online.animedia.tv";
		this.lock="on";
		this.title = "ANIMEDIA.TV";
	}else if (sURL.toLowerCase().indexOf("onlinemultfilmy.ru") >= 0){ //для onlinemultfilmy.ru
		prefix = "http://onlinemultfilmy.ru";
		this.lock="on";
		this.title = "ONLINEMULTFILMY.RU";
	}else if (sURL.toLowerCase().indexOf("www.playground.ru") >= 0){ //для www.playground.ru
		prefix = "http://www.playground.ru";
		//this.lock="on";
		this.title = "PLAYGRAUND.RU";
	}else if (sURL.toLowerCase().indexOf("fitness-video.net") >= 0){ //для www.playground.ru
		prefix = "http://fitness-video.net";
		//this.lock="on";
		this.title = "FITNESS-VIDEO.NET";
	}else if (sURL.toLowerCase().indexOf("kinohome.net") >= 0){ //для kinohome.net
		prefix = "http://kinohome.net";
		this.lock="on";
		this.title = "KINOHOME.NET";
	}else if (sURL.toLowerCase().indexOf("multyasha.com") >= 0){ //для multyasha.com
		prefix = "http://multyasha.com";
		this.lock="on";
		this.title = "MULTYASHA.COM";
	}else if (sURL.toLowerCase().indexOf("kino-live.org") >= 0){ //для kino-live.org
		prefix = "http://kino-live.org";
		this.lock="on";
		this.title = "KINO-LIVE.ORG";
	}else if (sURL.toLowerCase().indexOf("kinolist.net") >= 0){ //для kinolist.net
		prefix = "http://kinolist.net";
		this.lock="on";
		this.title = "KINOLIST.NET";
	}else if (sURL.toLowerCase().indexOf("kino-dom.tv") >= 0){ //для kino-dom.tv
		prefix = "http://kino-dom.tv";
		this.lock="on";
		this.title = "KINO-DOM.TV";
	}else if (sURL.toLowerCase().indexOf("kinokong.net") >= 0 ||
			sURL.toLowerCase().indexOf("nowfilms.ru") >= 0){ //для kinokong.net
		prefix = "http://kinokong.net";
		this.lock="";
		this.title = "KINOKONG.NET";
	}else if (sURL.toLowerCase().indexOf("online-docfilm.com") >= 0){ //для online-docfilm.com
		prefix = "http://online-docfilm.com";
		this.lock="on";
		this.title = "ONLINE-DOCFILM.COM";
	}else if (sURL.toLowerCase().indexOf("s-movie.ru") >= 0){ //для s-movie.ru
		prefix = "http://s-movie.ru";
		this.lock="on";
		this.title = "S-MOVIE.RU";
	}else if (sURL.toLowerCase().indexOf("s1.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("s2.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("s3.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("onlinefilmx2.tv") >= 0){ //для onlinefilmx.ru
		prefix = "http://onlinefilmx.tv";
		this.lock="";
		this.title = "onlinefilmx.tv";
	}else if (sURL.toLowerCase().indexOf("www.cinemaplayer.ru") >= 0){ //для cinemaplayer.ru
		prefix = "http://www.cinemaplayer.ru";
		this.lock="on";
		this.title = "CINEMAPLAYER.RU";
	}else if (sURL.toLowerCase().indexOf("vipzal.tv") >= 0){ //для moiserialy.net
		prefix = "http://vipzal.tv";
		this.lock="on";
		this.title = "VipЗал.tv";
	}else if (sURL.toLowerCase().indexOf("uroki-online.com") >= 0){ //для uroki-online.com
		prefix = "http://uroki-online.com";
		//this.lock="on";
		this.title = "UROKI-ONLINE.COM";			
	}else if (sURL.toLowerCase().indexOf("compteacher.ru") >= 0){ //для compteacher.ru
		prefix = "http://compteacher.ru";
		//this.lock="on";
		this.title = "COMPTEACHER.RU";		
	}else if (sURL.toLowerCase().indexOf("dom-film.net") >= 0){ //для dom-film.net
		prefix = "http://dom-film.net";
		this.lock="on";
		this.title = "DOM-FILM.NET";	
	}else if (sURL.toLowerCase().indexOf("rufilm.tv") >= 0){ //для rufilm.tv
		prefix = "http://rufilm.tv";
		this.lock="on";
		this.title = "RUFILM.TV";
	}else if (sURL.toLowerCase().indexOf("ranet.tv") >= 0){ //для ranet.tv
		prefix = "http://ranet.tv";
		this.lock="on";
		this.title = "RANET.TV";
	}else if (sURL.toLowerCase().indexOf("multxit.ru") >= 0){ //для multxit.ru
		prefix = "http://multxit.ru";
		this.lock="on";
		this.title = "MULTXIT.RU";  
	}else if (sURL.toLowerCase().indexOf("baskino.com") >= 0){ //для baskino.com
		prefix = "http://baskino.com";
		this.lock="on";
		this.title = "BASKINO.COM";  
	}else if (sURL.toLowerCase().indexOf("www.linecinema.org") >= 0){ //для linecinema.org
		prefix = "http://www.linecinema.org";
		this.lock="on";
		this.title = "LENECINEMA.ORG"; 
	}else if (sURL.toLowerCase().indexOf("minizal.net") >= 0){ //для minizal.net
		prefix = "http://minizal.net";
		this.lock="on";
		this.title = "MINIZAL.NET";
	}else if (sURL.toLowerCase().indexOf("onlainfilm.ucoz.ua") >= 0){ //для onlainfilm.ucoz.ua
		prefix = "http://onlainfilm.ucoz.ua";
		this.lock="on";
		this.title = "ONLAINFILM.UCOZ.UA"; 
	}else if (sURL.toLowerCase().indexOf("molot.tv") >= 0){ //для molot.tv
		prefix = "http://molot.tv";
		this.lock="on";
		this.title = "MOLOT.TV";
	}else if (sURL.toLowerCase().indexOf("my-hit.org") >= 0){ //для my-hit.net
		prefix = "https://my-hit.org";
		this.lock="on";
		this.title = "KinoZalXSMART";
	}else if (sURL.toLowerCase().indexOf("kinoschka.at.ua") >= 0){ //для www.kinoschka.at.ua
		prefix = "http://kinoschka.at.ua";
		this.lock="on";
		this.title = "KINOSHKA.AT.UA";
	}else if (sURL.toLowerCase().indexOf("www.videokub.me") >= 0){ //для videokub
		prefix = "http://www.videokub.me";
		this.lock="on";
		this.title = "VIDEOKUB.COM";
	}else if (sURL.toLowerCase().indexOf("new-kino.net") >= 0){ //для new-kino.net
		prefix = "http://new-kino.net";
		this.lock="on";
		this.title = "NEW-KINO.NET";
	}else if (sURL.toLowerCase().indexOf("filmodrom.net") >= 0){ //для filmodrom.net
		prefix = "http://filmodrom.net";
		this.lock="on";
		this.title = "FILMODROM.NET";
	}else if (sURL.toLowerCase().indexOf("vkino.net") >= 0){ //для VKINO.NET
		prefix = "http://vkino.net";
		this.lock="on";
		this.title = "VKINO.NET";
	}else if (sURL.toLowerCase().indexOf("o-nline.ws") >= 0){ //для o-nline.ws
		prefix = "http://o-nline.ws";
		this.lock="on";
		this.title = "O-NLINE.WS";
	}else if (sURL.toLowerCase().indexOf("vepizode.net") >= 0){ //для vepizode.net
		prefix = "http://vepizode.net";
		this.lock="on";
		this.title = "VEPIZODE.NET";
	}else if (sURL.toLowerCase().indexOf("animult.tv") >= 0){ //для animult.tv
		prefix = "http://animult.tv";
		this.lock="on";
		this.title = "ANIMULT.TV";
	}else if (sURL.toLowerCase().indexOf("mirclipov.com") >= 0){ //для mirclipov.com
		prefix = "http://mirclipov.com";
		this.lock="on";
		this.title = "MIRCLIPOV.COM";
	}else if (sURL.toLowerCase().indexOf("hdkinoklub.ru") >= 0){ //для hdkinoklub
		prefix = "http://hdkinoklub.ru";
		this.lock="on";
		this.title = "HDKINOKLUB.RU";
	}else if (sURL.toLowerCase().indexOf("videomax.org") >= 0){ //для videomax.org
		prefix = "http://videomax.org";
		this.lock="on";
		this.title = "VIDEOMAX.ORG";
	}else if (sURL.toLowerCase().indexOf("horrors-online.ru") >= 0){ //horrors-online.ru
		prefix = "http://horrors-online.ru";
		this.lock="on";
		this.title = "HORRORS-ONLINE.RU";
	}else if (sURL.toLowerCase().indexOf("veterok.tv") >= 0){ //для veterok.tv
		prefix = "http://veterok.tv";
		this.lock="";
		this.title = "VETEROK.TV";
	}else if (sURL.toLowerCase().indexOf("latino-serialo.ru") >= 0){ //для latino-serialo.ru
		prefix = "http://latino-serialo.ru";
		this.lock="on";
		this.title = "LATINO-SERIALO.RU";
	}else if (sURL.toLowerCase().indexOf("kinoprosmotr.net") >= 0){ //для kinoprosmotr.net
		prefix = "http://kinoprosmotr.net";
		this.lock="on";
		this.title = "KINOPROSMOTR.NET";
	}else if (sURL.toLowerCase().indexOf("filmsonline.com.ua") >= 0){ //для filmsonline.com.ua
		prefix = "http://filmsonline.com.ua";
		this.lock="on";
		this.title = "FILMSONLINE.COM.UA";
	}else if (sURL.toLowerCase().indexOf("moviestape.com") >= 0){ //для moviestape.com
		prefix = "http://moviestape.com";
		this.lock="on";
		this.title = "MOVIESTAPE.COM";
	}else if (sURL.toLowerCase().indexOf("levshafilm.tv") >= 0){ //для levshafilm.tv
		prefix = "http://levshafilm.tv";
		this.lock="";
		this.title = "LEVSHAFILM.TV";
	}else if (sURL.toLowerCase().indexOf("vk.com") >= 0){ //для vk.com
		prefix = "http://vk.com";
		this.lock="";
		this.title = "vk.com";
/////////////////////////////////////////////////////////////////////////////////////
						////ADULT/////
/////////////////////////////////////////////////////////////////////////////////////

	}else if (sURL.toLowerCase().indexOf("www.redtube.com") >= 0){ //для www.redtube.com
		prefix = "http://www.redtube.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("pornk.tv") >= 0){ //для pornk.tv
		prefix = "http://pornk.tv";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("onlain-porno-site.ru") >= 0){ //для onlain-porno-site.ru
		prefix = "http://onlain-porno-site.ru";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("fapa.tv") >= 0){ //для fapa.tv
		prefix = "http://fapa.tv";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("vtraxe.com") >= 0){ //для vtraxe.com
		prefix = "http://m.vtraxe.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.paradisehill.tv") >= 0){ //для www.paradisehill.tv
		prefix = "http://www.paradisehill.tv";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("ru-porn.tv") >= 0){ //для ru-porn.tv
		prefix = "http://ru-porn.tv";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("pornovhd.net") >= 0){ //для pornovhd.net
		prefix = "http://pornovhd.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("letseks.net") >= 0){ //для letseks.net
		prefix = "http://letseks.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("brazzers-hd.net") >= 0){ //для brazzers-hd.net
		prefix = "http://brazzers-hd.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("pornostate.net") >= 0){ //для pornostate.net
		prefix = "http://pornostate.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("hdpornoonline.net") >= 0){ //для hdpornoonline.net
		prefix = "http://hdpornoonline.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.youjizz.com") >= 0){ //для www.youjizz.com
		prefix = "http://www.youjizz.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.vporn.com") >= 0){ //для www.vporn.com
		prefix = "http://www.vporn.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("hellporno.com") >= 0){ //для hellporno.com
		prefix = "http://hellporno.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("pornomisto.ru") >= 0){ //для pornomisto.ru
		prefix = "http://pornomisto.ru";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.bangyoulater.com") >= 0){ //для www.bangyoulater.com
		prefix = "http://www.bangyoulater.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("youporn.com") >= 0){ //для youporn.com
		prefix = "http://ru.youporn.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.dojki.com") >= 0){ //для www.dojki.com
		prefix = "http://www.dojki.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.xtube.com") >= 0){ //для www.xtube.com
		prefix = "http://www.xtube.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.lenkino.com") >= 0){ //для www.lenkino.com
		prefix = "http://www.lenkino.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.hdtubes.net") >= 0){ //для www.hdtubes.net
		prefix = "http://www.hdtubes.net";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("www.spankwire.com") >= 0){ //для www.spankwire.com
		prefix = "http://www.spankwire.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("anysex.com") >= 0){ //для anysex.com
		prefix = "http://ru.anysex.com";
		this.lock="on";
		this.title = "18+";
	}else if (sURL.toLowerCase().indexOf("porno4you.org") >= 0){ //для porno4you.org
		prefix = "http://porno4you.org";
		this.lock="on";
		this.title = "18+";
/////////////////////////////////////////////////////////////////////////////////////
						////MUSIC BOX/////
/////////////////////////////////////////////////////////////////////////////////////
	}else if (sURL.toLowerCase().indexOf("www.clipos.ru") >= 0){ //для www.clipos.ru
		prefix = "http://www.clipos.ru";
		this.lock="on";
		this.title = "CLIPOS.RU";
	}else if (sURL.toLowerCase().indexOf("radiopotok.ru") >= 0){ //для radiopotok.ru
		prefix = "http://radiopotok.ru";
		this.lock="";
		this.title = "RADIO";
	}else if (sURL.toLowerCase().indexOf("metalvideo.com") >= 0){ //для metalvideo.com
		prefix = "http://metalvideo.com";
		this.lock="on";
		this.title = "METALVIDEO.COM";
	}else if (sURL.toLowerCase().indexOf("www.clipafon.ru") >= 0){ //для www.clipafon.ru
		prefix = "http://www.clipafon.ru";
		this.lock="on";
		this.title = "CLIPAFON.RU";
	}else if (sURL.toLowerCase().indexOf("trancelaciya.com") >= 0){ //для trancelaciya.com
		prefix = "http://trancelaciya.com";
		this.lock="on";
		this.title = "TRANCELACIYA.COM";	
/////////////////////////////////////////////////////////////////////////////////////
	}else if (sURL.toLowerCase().indexOf(this.keyUSB.toLowerCase()) >= 0){ //для USB-Drive
		this.lock=""
		this.title = "USB-Drive";
	}else if (sURL.toLowerCase().indexOf("mediaserver") >= 0){ //для HomeMediaServer
		this.lock=""
		this.title = "HomeMediaServer";
	}
	if(this.MODE_parser=="2_0" && Main.res>0 && this.lock=="on"){
		WINDOW.init("INFO","<center>"+Widget_txt.acriv_vip+"</center>","","","#636363");
	}else if(this.MODE_parser=="1_70" && INDEX=="lite" && this.lock=="on"){
		MSG.windows(Language.msg_msg,Language.msg_lite);
	}else{
		XURL.InitParsePortal(sURL);
	}
}

//Инициализация поисковых блоков порталов
XURL.InitParsePortal = function(sURL){
	console.log("sURL="+sURL);
	var prefix = "";
		//запоминаем входящую ссылку
	this.mURL=sURL;
		//сбрасываем размер лого, если вдруг менялся для определенных сайтов
	this.endedIco = "' align='left'/>";
	this.kUAdd = "";
	this.kEAdd = "";
	
	this.prefixURL =  "";
	this.kBUrl = '';
	this.kEUrl = '';
	this.prefixIMG =  "";
	this.kBDirImg = '';
	this.kBImg = '';
	this.kEImg = '';
	this.kDesBImg = '';
	this.kDesEImg = '';
	this.kBDes = '';
	this.kEDes = '';
	this.kBTit = "";
	this.kETit = "";
	this.kLogo = ""; //ссылка на логотип стримов
		//Ссылки на следующую страницу
	this.kBDisNeP = '';
	this.kBNeP = '';
	this.kENeP = '';		
		//определение страницы со стримом
	this.kPStm = '';
	this.pref_IMG = '';
	this.kPBIm = '';
	this.kPEIm = '';	
	this.kPBDs = '';
	this.kPEDs = '';
	this.prefixSRL = '';
	this.kPBUr = '';
	this.kPEUr = '';
	this.kPBTt = '';
	this.kPETt = '';
		
	if (this.NoP <= 0){
	   this.NoP = 1;
	}
		//двумерный массив строк, которые нужно заменить в тексте - первый вариант на второй
	this.arrReplWordsBkwd = [["&amp;", "&"], ["&lt;", "<"], ["&gt;", ">"], ["&apos;", "'"], ["&quot;", '\"']];
	this.arrReplWordsFrwd = [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ["'", "&apos;"], ['\"', "&quot;"]];
	this.arrReplWordsTitl = [["&amp;", "&"], ["&lt;", "<"], ["&gt;", ">"], ["&apos;", "'"], ["&quot;", '\"']];
	this.arrReplWordsDesc = [["h\\d+>", "b>"], ["</*p>","<br>"], ["\\s*<b>\\s*</b>", ""], ["\\s*<br>\\s*<br>", "<br>"]];
	this.arrReplWordsImge = [];
	this.arrReplWordsFile = [["[^/]*/", ""]];
	this.arrReplWordsPortal = [];
		//массив строк-масок регулярных выражений, подлежащих удалению из текста
	this.arrDelWords = ["<\\s*a[^<^>]*>", "<\\s*/\\s*a\\s*>", "<\\s*input[^<^>]*>", "<\\s*/*\\s*span[^>]*>", "<\\s*/*\\s*div[^>]*>", "<\\s*/*\\s*img[^>]*>", "<\\s*/*\\s*strong[^>]*>", "<\\s*/*\\s*ul[^>]*>"]; 
	prefix = sURL.match(new RegExp(".*://[^/]*", "im"));
	if (prefix == null){
		prefix = "";
	}
	if (sURL.toLowerCase().indexOf("ex.ua") >= 0){
			//По умолчанию основные параметры определяем для EX.UA
		this.prefixURL = prefix + "/";
		this.kBUrl = "<td><a href='/";
		this.kEUrl = "'>";
		this.kBImg = "<img src='";
		this.kEImg = "'";
			//описание
		this.kBDes = "";
		this.kEDes = "</td>";
		this.kBTit = "alt='";
		this.kETit = "'>";
			//ссылка на логотип стримов
		this.kLogo ="";
			//Ссылки на следующую страницу
		this.kBDisNeP="false";
		this.kBNeP = "<td><a href='/";
		this.kENeP = "'><img src='/t3/arr_r.gif' border=0 width=20 height=20 alt='перейти на следующую страницу, Ctrl &rarr;'>";
			//определение страницы со стримом
		this.kPStm = "/filelist/";
		this.kPBIm = "<table width=100% cellpadding=0 cellspacing=0 border=0><tr><td valign=top> <img src='";
		this.kPEIm = "'";	
		this.kPBDs = "<table width=100% cellpadding=0 cellspacing=0 border=0><tr><td valign=top>";
		this.kPEDs = "</td>";
		this.prefixSRL = prefix + "/get/";
		this.kPBUr = "<a href='/get/";
		this.kPEUr = "'";
		this.kPBTt = "title='";
		this.kPETt = "'";		
			//добавляем к началу массива элементы замены
		this.arrReplWordsFrwd.unshift(["\\?r=23775&rv=1,1", "?v=1,0&per=20"]);
		this.arrReplWordsTitl.unshift([" Статей: \\d+", ""]);
		this.arrReplWordsTitl.unshift(["\\s*\\d+\\.\\.\\d*\\s*", ""]);
		this.arrReplWordsTitl.unshift(["перейти на первую страницу", ""]);
		this.arrReplWordsTitl.unshift(["перейти на последнюю страницу, всего позиций - \\d+", ""]);
		this.arrReplWordsDesc.unshift(["перейти на следующую страницу, Ctrl &rarr;", ""]);
		this.arrReplWordsDesc.unshift(["перейти на предыдущую страницу, Ctrl &larr;", ""]);
		this.arrReplWordsImge.unshift(["/t2/arr_", prefix + "/t2/arr_"]);
		this.arrReplWordsImge.unshift(['\\?100', '?200']);
		this.arrReplWordsPortal.push(["<td> <a href='/", "<td><a href='/"]);
		this.arrReplWordsPortal.push(["<td align=center valign=center><a href='/", "<td><a href='/"]);

	}else if (sURL.toLowerCase().indexOf("fs.to") >= 0 ||
				sURL.toLowerCase().indexOf("cxz.to") >= 0 ||
				sURL.toLowerCase().indexOf("brb.to") >= 0){
			this.prefixURL = prefix + "/";
		if (sURL.toLowerCase().indexOf("search.aspx?search") >= 0){
			this.kBUrl = '</span> </span> </a> <a href="/';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '<span class="b-search-page__results-item-right">';
			this.kEDes = '<span class="b-search-page__results-item-tags">';
			this.kBTit = '<span class="b-search-page__results-item-title">';
			this.kETit = "</span>";
		}else if (sURL.toLowerCase().indexOf("/myfavourites.aspx") >= 0){
			this.kBUrl = '<div class="b-poster-thin__wrapper"> <a href="/';
			this.kEUrl = '"';
			this.kBImg = "url('";
			this.kEImg = "'";
			this.kBDes = '<b class="subject-link" style="background-color:#ffffff;">';
			this.kEDes = '<a class="b-poster-thin__link-delete"';
			this.kBTit = '<span>';
			this.kETit = "</span>";
		}else{
			this.kBUrl = '<a class="b-poster-detail__link" href="/';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '';
			this.kEDes = '</td>';
			this.kBTit = "alt=\'";
			this.kETit = "\'";
		}     
		//определение страницы со стримом
		this.kPStm = 'filelist';
		this.kPBIm = 'href="#"> <img src="';
		this.kPEIm = '"';
		this.kPBDs = '<div class="item-info">';
		this.kPEDs = '</div>';
		this.prefixSRL = prefix + '/';
		this.kPBUr = '<div id="page-item-file-list" class="item" style="display:none;"> <a href="';
		this.kPEUr = '"';
		this.kPBTt = '">';
		this.kPETt = '</a>';

		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(["Не фильтровать", ""], ["Список файлов", ""], ["<\\s*/*\\s*span[^>]*>", ""], ["<\\s*/*\\s*div[^>]*>", ""], ["<\\s*/*\\s*a[^>]*>", ""], ["<\\s*/*\\s*b[^>]*>", ""], ["<\\s*/*\\s*i[^>]*>", ""]);
		this.arrReplWordsDesc.unshift(["'</span></a></span>", ",</span>"],['><span class="b-poster-detail__left">', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-positive">[0-9]', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-positive">[0-9][0-9]', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-positive">[0-9][0-9][0-9]', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-positive">[0-9][0-9][0-9][0-9]', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-negative">[0-9]', ""]);
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-negative">[0-9][0-9]', ""])
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-negative">[0-9][0-9][0-9]', ""])
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__vote-negative">[0-9][0-9][0-9][0-9]', ""])
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__field">', '</br>'])		
		this.arrReplWordsDesc.unshift(['<span class="b-poster-detail__description">', '</br><font color="#74b9fe">Описание: </font>'])
		this.arrReplWordsDesc.unshift(['?', '</br><font color="#74b9fe">Страна: </font>'])
		this.arrReplWordsDesc.unshift(["<\\s*tr[^>]*>", ""]);
		this.arrReplWordsDesc.unshift(["<\\s*/*\\s*td[^>]*>", ""]);
		this.arrReplWordsDesc.unshift(["<\\s*/+\\s*tr[^>]*>", "<br>"]);
		//добавляем к концу массива элементы на удаление
		this.arrDelWords.push("<\\s*/*\\s*table[^>]*>");
		this.arrReplWordsPortal.push(['<a href=""', '<a href="#"']);
		this.arrReplWordsPortal.push(['&darr;', ''],['<div class="b-search-page__results"> <a href="/','</span> </span> </a> <a href="/']);
		this.arrReplWordsPortal.push(['<div class="b-search-page__results"> <a href="/', '</span> </a> <a href="/']);
		this.arrReplWordsPortal.push(['Скачать', 'Смотреть онлайн']);
		this.arrReplWordsPortal.push(['<span class="b-file-new__material-filename-text">', '<span class="b-file-new__link-material-filename-text">']);
		
	}else if (sURL.toLowerCase().indexOf("uakino.net") >= 0){
		this.prefixURL = prefix + "/";
		if (sURL.toLowerCase().indexOf("search_result.php?") >= 0){
			this.kBUrl = '<div class="media_line_item"> <a href="';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = 'title="';
			this.kEDes = '"';
		}else{
			this.kBUrl = '<div class="media_line_item odd"> <a href="';
			this.kEUrl = '">';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '/></a>';
			this.kEDes = '</ul>';
			this.kBTit = '">';
			this.kETit = '</a>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://uakino.net/';
		this.kENeP = 'class="nav_button">&gt;<span></span></a>';		
		//определение страницы со стримом
		this.kPStm = '<input type="text" name="embed_iframe" value="&lt;iframe src=&quot;';
		this.kPBIm = ' <img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<span class="hidden" itemprop="name">';
		this.kPEDs = '</span>';
		this.kPBUr = '<input type="text" name="embed_iframe" value="&lt;iframe src=&quot;';
		this.kPEUr = '&quot;';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<img src="/', '<img src="http://uakino.net/']);
		this.arrReplWordsPortal.push(['<div class="media_line_item even"> <a href="', '<div class="media_line_item odd"> <a href="']);
		
	}else if (sURL.toLowerCase().indexOf("uakino.tk") >= 0){
		this.prefixURL = prefix + "/";
		this.kBUrl = '</span></a></div> <a href="http://uakino.tk/';
		this.kEUrl = '">';
		this.kBImg = '<img class="article-img" src="';
		this.kEImg = '"';
		this.kBDes = '<div class="article-film-title">';
		this.kEDes = '<div class="article-film-categories"></div>';
		this.kBTit = 'title="';
		this.kETit = '"';
		this.kBDisNeP="false";		
		this.kBNeP = '<a href="http://uakino.tk/';
		this.kENeP = '"><span class="page-next">Вперед</span></a>';		
		//определение страницы со стримом
		this.kPStm = 'file:"';
		this.kPBUr = 'file:"';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<center><iframe src="', 'file:"']);
		
	}else if (sURL.toLowerCase().indexOf("911.to") >= 0){
		this.prefixURL = prefix + "/";
		if (sURL.toLowerCase().indexOf("search_movie?term=") >= 0){
			this.kBUrl = '<div class="image pull-left"><a href="/';
			this.kEUrl = '">';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '<h5>';
			this.kEDes = '</div>';
			this.kBTit = '">';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<div class="image pull-left"> <a class="ya-metrics" data-target-name="PLAY_POSTER_MAIN" href="/';
			this.kEUrl = '">';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '<div class="info pull-right">';
			this.kEDes = '</div> </div>';
			this.kBTit = '">';
			this.kETit = '"';
		}
		this.kBNeP = '</li> <li> <a rel="next" href="/';
		this.kENeP = '">';		
		//определение страницы со стримом
		this.kPStm = "var href = '/";
		this.kPBIm = '<a href="#top" data-target-name="PLAY_CARD_POSTER"';
		this.kPEIm = '" />';	
		this.kPBDs = '<div class="hidden" id="playerContainer">';
		this.kPEDs = '<a class="expandToggle view-story_toggle" href="#">';
		this.prefixSRL = prefix + "/";
		this.kPBUr = "var href = '/";
		this.kPEUr = "'";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="description">', '</br><div class="description">']);
		this.arrReplWordsDesc.unshift(['<div class="line caps">', '</br><div class="line caps">']);
		this.arrReplWordsDesc.unshift(['<div class="year">', '</br><div class="year">Год: ']);
		this.arrReplWordsDesc.unshift(['<div class="genre">', '</br><div class="genre">Жанр: ']);
		this.arrReplWordsDesc.unshift(['<div class="add">', '<div class="add"></br>']);
		
	}else if (sURL.toLowerCase().indexOf("tree.tv") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '</div> <a href="/';
		this.kEUrl = '">';
		this.kBImg = 'src="/';
		this.kEImg = '"';
		this.kBDes = '<div class="item_content">';
		this.kEDes = '<div class="item_content_more">';
		this.kBTit = '">';
		this.kETit = '</a>';
		//определение страницы со стримом
		this.kPStm = 'accordion_content active';
		this.kPBUr = 'title="Скачать" href="';
		this.kPEUr = '"';
		this.arrReplWordsDesc.unshift(['Добавлен:', '</br>Добавлен:']);
		this.arrReplWordsPortal.push(['rel="', 'title="Скачать" href="']);
		
	}else if (sURL.toLowerCase().indexOf("ofx.to") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="sscn"> <a href="http://ofx.to/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = 'title="';
			this.kEDes = '"';
		}else{
			this.kBUrl = '<span class="pic relative"><a href="http://ofx.to/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = '</span>';
			this.kEDes = '<p class="icons">';
			this.kBTit = '<span class="name">';
			this.kETit = '</span>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://ofx.to/';
		this.kENeP = '">Далее</a></div></div>';		
		//определение страницы со стримом
		this.kPStm = '<iframe rel="nofollow" src="';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<link rel="image_src" href="/';
		this.kPEIm = '"';	
		this.kPBDs = '<dl class="info-list">';
		this.kPEDs = '<ul class="unit-rating">';
		this.kPBUr = '<iframe rel="nofollow" src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['</dt><dd>', '']);
		
	}else if (sURL.toLowerCase().indexOf("www.kino-ussr.ru") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix;
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="title"><a href="http://kino-ussr.ru/';
			this.kEUrl = '"';
			this.kDesBImg = '<img src="';
			this.kDesEImg = '"';
			this.kBDes = '<div class="newstext">';
			this.kEDes = '</table>';
			this.kBTit = 'title="';
			this.kETit = '"';
		}else{
			this.kBUrl = '<td class="news_8"><div class="title"><a href="http://kino-ussr.ru/';
			this.kEUrl = '"';
			this.kDesBImg = '<img src="';
			this.kDesEImg = '"';
			this.kBDes = '<div class="newstext">';
			this.kEDes = '<div class="seemore">';
			this.kBTit = 'title="';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://kino-ussr.ru/';
		this.kENeP = '">Далее</a></div>';		
		//определение страницы со стримом
		this.kPStm ='<iframe src="';	
		this.kPBDs = '<h1 class="entry-title">';
		this.kPEDs = '<span class="suffix">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<object type="text/html" data="', '<iframe src="']);
		
	}else if (sURL.toLowerCase().indexOf("playground.ru") >= 0){
		this.prefixURL = prefix + "/";
		this.kBUrl = '<div class="tileview-list-item video-tile"><a href="http://www.playground.ru/';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';
		this.kBDes = '<div class="tileview-item-header small">';
		this.kEDes = '</a>';
		this.kBTit = '<class="title">';
		this.kETit = '</h2>';
		this.kBNeP = '<li class="next"><a href="/';
		this.kENeP = '" title="следующая" rel="next">';		
		//определение страницы со стримом
		this.kPStm = 'file: "';
		this.kPBUr = 'file: "';
		this.kPEUr = '"';
		this.kPBTt = 'label: "';
		this.kPETt = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<h2 class="title">', '<class="title">']);
		
	}else if (sURL.toLowerCase().indexOf("levshafilm.tv") >= 0){
		this.prefixURL = prefix + "/";
		this.kBUrl = '<a class="clip-link"';
		this.kEUrl = '">';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<h2 class="entry-title">';
		this.kEDes = '<span class="suffix"';
		this.kBTit = '">';
		this.kETit = '</a>';	
		//определение страницы со стримом
		this.kPStm = '<source type="video/mp4" src="';
		this.kPBDs = '<h1 class="entry-title">';
		this.kPEDs = '<span class="suffix">';
		this.kPBUr = '<source type="video/mp4" src="';
		this.kPEUr = '?';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['rel="author">', 'rel="author">Автор: ']);
		this.arrReplWordsDesc.unshift(['<time class="entry-date"', '</br>Дата перевода: <time class="entry-date"']);
		this.arrReplWordsDesc.unshift(['<span class="views">', '<span class="views"></br>Просмотров: ']);
		
	}else if (sURL.toLowerCase().indexOf("www.kinoxa-x.ru") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '</div> <h2 style="font-weight:normal;"><a href="http://www.kinoxa-x.ru/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '</a>';
		}else{
			this.kBUrl = '<div class="eTitle" style="text-align:left;font-weight:nrmal !important;"> <a href="http://www.kinoxa-x.ru/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = '<div class="title-short';
			this.kEDes = '</table>';
			this.kBTit = '"';
			this.kETit = '<';
		}
		this.kBNeP = '</span> <a href="http://www.kinoxa-x.ru/';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = 'http://srv1.kinoxa-x.ru/';
		this.kPBIm = '<img itemprop="image" src="';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="znachenie perv">';
		this.kPEDs = '<div class="posters-film">';
		this.prefixSRL = 'http://srv1.kinoxa-x.ru/';
		this.kPBUr = 'http://srv1.kinoxa-x.ru/';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(['>', '']);
		this.arrReplWordsDesc.unshift(['смотреть онлайн в HD', '']);
		this.arrReplWordsPortal.push([".flv'", '.flv"']);
		
	}else if (sURL.toLowerCase().indexOf("www.comedyportal.net") >= 0){
		this.prefixURL = prefix + "/";
		if (sURL.toLowerCase().indexOf("search/node") >= 0){
			this.kBUrl = '<dt class="title"> <a href="http://www.comedyportal.net/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '<';
		}else{
			this.kBUrl = '<p style="text-align: left;"> </p> <p><a href="http://www.comedyportal.net/';
			this.kEUrl = '"';
			this.kBImg = 'SRC="';
			this.kEImg = '"';
			this.kBDes = 'ALT=';
			this.kEDes = '<div class="clear-block">';
			this.kBTit = '"';
			this.kETit = '"';	
		}
		this.kBNeP = '<li class="pager-next"><a href="/';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = "object id='pl' frameborder='0' data='";
		this.kPBUr = "object id='pl' frameborder='0' data='";
		this.kPEUr = "'";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(['>', '']);
		this.arrReplWordsDesc.unshift(['смотреть онлайн', '']);
		
	}else if (sURL.toLowerCase().indexOf("www.anibox.ru") >= 0){
		this.prefixURL = prefix + "/";
		if (sURL.toLowerCase().indexOf("search/?q=") >= 0){
			this.kBUrl = '<div class="eTitle" style="text-align:left;font-weight:normal"><a href="http://anibox.ru/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '</a>';
		}else{
			this.kBUrl = '</a> » <a href="http://www.anibox.ru/';
			this.kEUrl = '"';
			this.kDesBImg = '<img src="';
			this.kDesEImg = '"';
			this.kBDes = 'class="tbox"';
			this.kEDes = '</span12></center>';
			this.kBTit = '>';
			this.kETit = '</a>';
		}
		this.kBDisNeP="false";
		this.kBNeP = 'href="/';
		this.kENeP = '><span>&raquo;</span>';	
		//определение страницы со стримом
		this.kPStm = "http://vk.com/video_ext.php?";
		this.prefixSRL = 'http://vk.com/video_ext.php?';
		this.kPBUr = "http://vk.com/video_ext.php?";
		this.kPEUr = "'";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(['>', '']);
		this.arrReplWordsDesc.unshift(['смотреть онлайн', '']);
		this.arrReplWordsPortal.push(['" width="607"', "'"]);
		this.arrReplWordsDesc.unshift(['/>', '']);

	}else if (sURL.toLowerCase().indexOf("cinem.tv") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="elemnt_ov"> <a href="http://cinem.tv/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = 'title=';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBNeP = '</a> <span class="hidden-link" data-link="';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = "video_url: '";
		this.kPBIm = 'rel="image_src" href="';
		this.kPEIm = '"';	
		this.kPBDs = 'name="mrc__share_description" content="';
		this.kPEDs = '"';
		this.kPBUr = "video_url: '";
		this.kPEUr = "/',";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['|', '']);
		this.arrReplWordsDesc.unshift(['Смотреть онлайн в HD качестве', '']);	
		
	}else if (sURL.toLowerCase().indexOf("gamebomb.ru") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="video"> <a class="img" href="http://gamebomb.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img class="cover" src="/';
		this.kEImg = '"';
		this.kBDes = '<div class="title">';
		this.kEDes = '<a class="comments-bubble"';
		this.kBTit = '<b>';
		this.kETit = '</b>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://gamebomb.ru/';
		this.kENeP = '" title="Следующая страница">';	
		//определение страницы со стримом
		this.kPStm = "video { url: '";
		this.kPBIm = "cover image { url: '";
		this.kPEIm = "',";
		this.kPBUr = "video { url: '";
		this.kPEUr = "'";
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<span class="views-bubble"', '<font color="#74b9fe"></br>Просмотров: </font><span class="views-bubble"']);
		
	}else if (sURL.toLowerCase().indexOf("hdrezka.tv") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = 'data-url="http://hdrezka.tv/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = '<div class="b-content__inline_item-link">';
		this.kEDes = '<div class="b-content__inline_item';
		this.kBTit = 'html">';
		this.kETit = '</a>';
		this.kBDisNeP="false";		
		this.kBNeP = 'href="http://hdrezka.tv/';
		this.kENeP = '"><span class="b-navigation__next i-sprt">';		
		//определение страницы со стримом
		this.kPStm = '<div id="ownplayer"';
		this.kPBIm = '<link rel="image_src" href="';
		this.kPEIm = '"';	
		this.kPBDs = '<table class="b-post__info">';
		this.kPEDs = '<div class="b-post__social_holder"';
		this.kPBUr = 'mp4":"';
		this.kPEUr = '"';
		this.kPBTt = 'vod/';
		this.kPETt = '?';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['Добавлен:', '</br>Добавлен:']);
		this.arrReplWordsPortal.push(['full/', 'vod/'],['<iframe src="','mp4":"']);
		this.arrReplWordsPortal.push(['<div class="b-navigation">', '<div class="b-content__inline_item']);
		this.arrReplWordsPortal.push(['<iframe width="640" height="360" src="', 'mp4":"']);
		this.arrReplWordsPortal.push(['<iframe id="cdn-player" src="', 'mp4":"']);
		
	}else if (sURL.toLowerCase().indexOf("www.youtube.com") >= 0){
		this.prefixURL = prefix + "/";
		this.kEUrl = '"';
		this.kBDes = 'data-title="';
		this.kEDes = 'alt="';
		this.kBTit = 'data-title="';
		this.kETit = '">';
		//определение страницы со стримом
		this.kPStm = '<a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink spf-link" dir="ltr" href="/';
		this.prefixSRL = prefix + "/";
		this.kPBUr = '<a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink spf-link" dir="ltr" href="/';
		this.kPEUr = '"';
		//добавляем к концу массива элементы на удаление

	}else if (sURL.toLowerCase().indexOf("kinoylei.org") >= 0){
		this.prefixURL =  prefix + "/";
		this.kBUrl = '<a class="film_link" href="http://kinoylei.org/';
		this.kEUrl = '"';
		this.kDesBImg = 'src="';
		this.kDesEImg = '"';
		this.kBDes = '<h5>';
		this.kEDes = '</a>';
		this.kBTit = "<h5>";
		this.kETit = "</h5>";
		this.kBNeP = '</span></a> <b class="swchItemA1"><span>';
		this.kENeP = '" onclick=';		
		//определение страницы со стримом
		this.kPStm = '<iframe class="myvideo" src="';
		this.kPBIm = '<div class="film_photo"><img';
		this.kPEIm = '">';
		this.kPBDs = '<div id="tab3" class="tab_content">';
		this.kPEDs = '<noindex>';
		this.kPBUr = '<iframe class="myvideo" src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<b class="swchItemA1"><span>1-20</span></b> <a class="swchItem1" href="', '</span></a> <b class="swchItemA1"><span>']);
		
	}else if (sURL.toLowerCase().indexOf("kinomaxpro.com") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().lastIndexOf("subaction=search&do=search&story=") >= 0){
			this.kBUrl = '<li class="title"><a href="http://kinomaxpro.com/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '</li>';
			this.kBTit = '>';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<div class="poster"> <a href="http://kinomaxpro.com/';
			this.kEUrl = '">';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = '<li class="title">';
			this.kEDes = '<div class="description_file">';
			this.kBTit = '">';
			this.kETit = '</a>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://kinomaxpro.com/';
		this.kENeP = '">Следующая';		
		//определение страницы со стримом
		this.kPStm = 'iframe src';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<div class="poster"> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="information">';
		this.kPEDs = '<div class="description">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(["онлайн", ""]);
		this.arrReplWordsDesc.unshift(['</dl>', ''],['<dl>', '']);
		
	}else if (sURL.toLowerCase().indexOf("v720.ru") >= 0){
		this.prefixURL = prefix + "/";
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().lastIndexOf("subaction=search&do=search&story=") >= 0){
			this.kBUrl = '<div id="sort"> <a href="http://v720.ru/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '</a>';
			this.kBTit = '>';
			this.kETit = '</a>';
		}else{
			this.kBUrl = 'class="short-story_img"> <a href="http://v720.ru/';
			this.kEUrl = '">';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = 'alt=';
			this.kEDes = '<tr align="right">';
			this.kBTit = '"';
			this.kETit = '"';		
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://v720.ru/';
		this.kENeP = '">Далее';	
		//определение страницы со стримом
		this.kPStm = 'iframe src';
		this.kPBIm = '<!--TBegin--><a href="';
		this.kPEIm = '"';	
		this.kPBDs = '<!--TEnd-->';
		this.kPEDs = '<div class="title_spoiler">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(["онлайн", ""]);
		this.arrReplWordsDesc.unshift(['<li>', ''],["/></a> <div id='ratig-layer-", "</br><div id='ratig-layer-"]);
		this.arrReplWordsDesc.unshift(['return false;">[0-9]</a>', 'return false;"></a>'],['<li class="current-rating" style="width:85px;">[0-9][0-9]</li>', '']);

	}else if (sURL.toLowerCase().indexOf("serials.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.kBDisNeP="false";
		if (sURL.toLowerCase().lastIndexOf("season") >= 0){
			this.kBUrl = '<div class="episode-image-wrapper"> <a href="http://serials.tv/';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';	
			this.kBDes = '<div class="episode-title-wrap">';
			this.kEDes = "</a>";
			this.kBTit = '<span class="episode-title" itemprop="name">';
			this.kETit = '<';
		}else{
			this.kBUrl = '<div class="show-item"> <a href="http://serials.tv/';
			this.kEUrl = '"';
			this.kBImg = 'src="';
			this.kEImg = '"';		
			this.kBDes = '<span class="show-title-primary">';
			this.kEDes = "</div>";
			this.kBTit = '<h2>';
			this.kETit = '</a>';
			this.kBNeP = '<a class="limit-pages pagination-link" href="/';
			this.kENeP = '">&rarr;</a>';
		}
		//определение страницы со стримом
		this.kPStm = 'episode-head';
		this.kPBUr = "src: '";
		this.kPEUr = "'";		
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['class="show-nav-link" href="http://serials.tv/', '<div class="show-item"> <a href="http://serials.tv/']);
		this.arrReplWordsPortal.push(['<span class="dashed">', 'src=""<span class="show-title-primary"><h2>CЕЗОН ']);
		this.arrReplWordsPortal.push(['</span>', '</div>']);
 
	}else if (sURL.toLowerCase().indexOf("amovies.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix;
		this.kBDirImg = 'true';
		if (sURL.toLowerCase().indexOf("search&subaction=search&story") >= 0){
			this.kBUrl = '<div class="post_info"> <a href="http://amovies.tv/';
			this.kEUrl = '"';	
			this.kBDes = ">";
			this.kEDes = '</a>';
			this.kBTit = '>';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<div class="post_name"> <a href="http://amovies.tv/';
			this.kEUrl = '"';
			this.kBImg = '<div class="post_prev_img"><img src="';
			this.kEImg = '"';
			this.kBDes = ">";
			this.kEDes = '<div class="post_text">';
			this.kBTit = '>';
			this.kETit = '</a>';
		}
		//Ссылки на следующую и предыдущую страницы
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://amovies.tv/';
		this.kENeP = '"><li>Вперед</li></a>';		
		//определение страницы со стримом
		this.kPStm = 'player">';
		this.kPBIm = '<div class="prev_img"><img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<ul class="post_info ul_clear">';
		this.kPEDs = '<li class="cosial">';
		this.kPBUr = '<option value="';
		this.kPEUr = '"';
		this.kPBTt = ">";
		this.kPETt = "<";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['exvis.org', 'vk.com']);
		this.arrReplWordsPortal.push(['<li class="films_if"><iframe src="', '<option value="']);
		
	}else if (sURL.toLowerCase().indexOf("multfilmchik.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<h2><a href="http://multfilmchik.ru/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';		
			this.kBDes = 'alt=';
			this.kEDes = '<td colspan="2" align="center">';
			this.kBTit = '"';
			this.kETit = '"';
		}else{
			this.kBUrl = '<td class="a2"><h2><a href="http://multfilmchik.ru/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';		
			this.kBDes = 'title=';
			this.kEDes = '<td class="a3" colspan="2">';
			this.kBTit = '"';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://multfilmchik.ru/';
		this.kENeP = '">Вперёд</a>';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<td class="a3" colspan="2"> <br /> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '<p class="a2">';
		this.kPEDs = '<br clear="all">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["/>", ""]);
				
		//http://www.zoomby.ru/api/suggest.json?q=%D0%BF%D0%B8%D0%BD%D0%B3%D0%B2%D0%B8%D0%BD%D1%8B
	}else if (sURL.toLowerCase().indexOf("www.zoomby.ru") >= 0){
		if (sURL.toLowerCase().indexOf("zoomby.ru/series") >= 0||
			sURL.toLowerCase().indexOf("zoomby.ru/shows") >= 0){
			this.prefixURL = prefix + '/ajax/series/';
			this.kBUrl = '"content_id":"';
		}else if (sURL.toLowerCase().indexOf("ajax/series") >= 0){
			this.prefixURL = prefix + '/';
			this.kBUrl = '<a href="/';
		}else{
			this.prefixURL = prefix + '/';
			this.kBUrl = '"url":"/';
		}
		if (sURL.toLowerCase().indexOf("ajax/series") >= 0){
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '<strong class="row1long" itemprop="name">';
			this.kEDes = '</strong>';
			this.kBDisNeP="false";
			this.kBNeP = '<a href="#view_all_series" onClick="showPage(';
			this.kENeP = ')">далее &rarr;</a>';
		}else{
			this.kEUrl = '"';
			this.kBImg = '"preview":"';
			this.kEImg = '"';	
			this.kBDes = '"title":"';
			this.kEDes = '"';
			this.kBNeP = '"next":';
			this.kENeP = ',';
		}		
		//определение страницы со стримом
		this.kPStm = 'var flashvars = { video: "';
		this.kPBIm = '<link rel="image_src" href="';
		this.kPEIm = '">';	
		this.kPBDs = '<meta name="title" content="';
		this.kPEDs = '"/>';
		this.kPBUr = 'var flashvars = { video: "';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift([">", ""]);
		
	}else if (sURL.toLowerCase().indexOf("animedia.tv") >= 0){
		this.prefixURL = prefix + '/';	
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="col-md-3 col-sm-3 anime-cell"> <a href="http://online.animedia.tv/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';		
		this.kBDes = '<table class="caption">';
		this.kEDes = '</div>';
		this.kBTit = '<td>';
		this.kETit = '</td>';
		this.kBDisNeP="false";
		this.kBNeP = '<li><a href="http://online.animedia.tv/';
		this.kENeP = '">следующая</a></li>';		
		//определение страницы со стримом
		this.kPStm = '<div class="card-list-series-anime no-underline">';
		this.kPBIm = '<a href="" class="fancybox"> <img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="col-md-12">';
		this.kPEDs = '<div class="row">';
		this.kPBUr = '<li class=""><a href="';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("www.moviki.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="image " > <a href="http://www.moviki.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img class="thumb" src="';
		this.kEImg = '"';	
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBNeP = '</span> <a href="/';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = 'http://www.moviki.ru/embed/';
		this.kPBIm = '/';
		this.prefixSRL = 'http://www.moviki.ru/embed/';
		this.kPBUr = 'http://www.moviki.ru/embed/';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["/>", ""]);
		this.arrReplWordsPortal.push(["'model_id'] = ", ""]);
		this.arrReplWordsPortal.push(["; modelCommentsEnableComments", '/0/"']);
		this.arrReplWordsPortal.push(["'ac_wait'; params", 'http://www.moviki.ru/embed/0/']);
		this.arrReplWordsPortal.push(['<div class="image"> <a href="http://www.moviki.ru/', '<div class="image " > <a href="http://www.moviki.ru/']);

	}else if (sURL.toLowerCase().indexOf("moviki.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '</ul> </div> <a href="http://moviki.tv/';
			this.kEUrl = '"';
			this.kBDes = '<span class="new-album-title">';
			this.kEDes = '</span>';
		}else{
			this.kBUrl = '<div class="new-album-image"> <a href="http://moviki.tv/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = '</div>';
			this.kEDes = '</div><div class="new-album-main">';
			this.kBTit = '<span class="new-album-title">';
			this.kETit = '</span>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://moviki.tv/';
		this.kENeP = '">вперед</a>';		
		//определение страницы со стримом
		this.kPStm = 'http://www.moviki.ru/embed/';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<div class="full-top-image"> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="relative">';
		this.kPEDs = '<div style="clear: both;height: 20px;"></div>';
		this.prefixSRL = 'http://www.moviki.ru/embed/';
		this.kPBUr = 'http://www.moviki.ru/embed/';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="custom-label">', "</br>Качество: "],['<ul class="unit-rating">', '</br>Рейтинг: '],['<div class="custom-update">', '</br>Год: ']);
		
	}else if (sURL.toLowerCase().indexOf("online-serial.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<h2><a href="http://online-serial.tv/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';	
		this.kBDes = 'title=';
		this.kEDes = '<div class="dpad">';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://online-serial.tv/';
		this.kENeP = '"><span class="thide pnext">Вперед</span></a>';		
		//определение страницы со стримом
		this.kPStm = '<div style="text-align:center;"><iframe src=';
		this.kPBUr = '<div style="text-align:center;"><iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["</p>", ""]);
		this.arrReplWordsPortal.push(["name='film_main' id='film_main' src='http://vkontakte.ru/", '<div style="text-align:center;"><iframe src="http://vk.com/'],["' width='", '"']);
		this.arrReplWordsPortal.push(['</option><option value="http://vkontakte.ru/', '<div style="text-align:center;"><iframe src="http://vk.com/']);
		
	}else if (sURL.toLowerCase().indexOf("dom-film.net") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		this.kBDirImg = 'true';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="main-news"> <div class="main-news-image"> <div class="main-news-image2"> <a href="http://dom-film.net/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';		
			this.kBDes = 'alt="';
			this.kEDes = '"';
		}else{
			this.kBUrl = '<div class="main-n"><a href="http://dom-film.net/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';		
			this.kBDes = '>';
			this.kEDes = '<';
		}
		this.kBNeP = '</span> <a href="http://dom-film.net/';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = '<div class="full-news-video-title">';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<div class="full-news-left-image"> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="full-news-right">';
		this.kPEDs = '<div class="full-news-text">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<a id="', '<iframe src="']);
	
	}else if (sURL.toLowerCase().indexOf("s-movie.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="midle"> <a href="http://s-movie.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = '<!--dle_image_end-->';
		this.kEDes = '<div class="bottom">';
		this.kBTit = '">';
		this.kETit = '<';
			//Ссылки на следующую и предыдущую страницы
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://s-movie.ru/';
		this.kENeP = '">Далее</a></div></div></div>';		
			//определение страницы со стримом
		this.kPStm = 'style="display:inline;"><iframe src="';
		this.kPBIm = '<!--dle_image_begin:';
		this.kPEIm = '|-->';
		this.kPBDs = '<strong>';
		this.kPEDs = '<div style=';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
			//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['" >', '">'],['<iframe src="//', '<iframe src="http://']);
		
	}else if (sURL.toLowerCase().indexOf("kinoprosmotr.net") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		this.kBUrl = ' <h2><a href="http://kinoprosmotr.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = '<div class="teaser_edit_fav">';
		this.kEDes = '</div></div>';
		this.kBTit = '</span>';
		this.kETit = '</li>';
			//Ссылки на следующую и предыдущую страницы
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://kinoprosmotr.net/';
		this.kENeP = '">Следующая</a></div></div></div></div>';		
			//определение страницы со стримом
		this.kPStm = '<object id="videoplayer';
		this.kPBUr = 'file=';
		this.kPEUr = '&amp;poster=';
			//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["<li>", "</br>"]);
		this.arrReplWordsPortal.push(['%3A%2F%2F', '://'],['%3F', '?'],['%2F', '/'],['%3D', '='],['%26', '&'],['%20', ''],["pl=","file="]);	
		
	}else if (sURL.toLowerCase().indexOf("moviestape.com") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="search_top"><h3><a href="http://moviestape.com/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '</a>';
		}else{
			this.kBUrl = '<div class="poster_movie"><a href="http://moviestape.com/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = 'alt=';
			this.kEDes = 'width';
			this.kBTit = '"';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://moviestape.com/';
		this.kENeP = '"><span> &rarr;</span></a></div>';		
		//определение страницы со стримом
		this.kPStm = 'id="pl" frameborder="0" data="';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<div class="f-poster2"> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="f-content2">';
		this.kPEDs = '<div class="f-content2_r';
		this.kPBUr = 'id="pl" frameborder="0" data="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["<h3>", " - "],['/>', '']);
		this.arrReplWordsPortal.push(['<div class="poster_ero">', '<div class="poster_movie">'],['<div class="bnewmovie"> <div class="mn"> </div> ', '<div class="poster_movie">'],['<div class="bnewmovie"> ', '<div class="poster_movie">']);
		this.arrReplWordsPortal.push(['<img class="image4" src="http://moviestape.com/', '<img src="/'],['<img class="image4" src="/', '<img src="/']);
		this.arrReplWordsPortal.push(['<div class="btr3"> <a href="', '<div class="poster_movie"><a href="'],['<img class="image3" src="http://moviestape.com/', '<img src="/'],['<img class="image3" src="/', '<img src="/'],['</a> <p><a href=', 'width']);
	
	}else if (sURL.toLowerCase().indexOf("online.anidub.com") >= 0){
		this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("do=search&subaction=search&story") >= 0){
			this.kBUrl = '<div class="title"> <a href="http://online.anidub.com/';
			this.kEUrl = '"';
			this.kDesBImg = '<div class="poster_img"><img src="';
			this.kDesEImg = '"';	
			this.kBDes = '>';
			this.kEDes = '<div class="newsfoot">';
			this.kBTit = '>';
			this.kETit = '<';
		}else{
			this.kBUrl = '<div class="title" itemprop="name"> <a href="http://online.anidub.com/';
			this.kEUrl = '"';
			this.kDesBImg = 'data-original="';
			this.kDesEImg = '"';	
			this.kBDes = '<div class="maincont">';
			this.kEDes = '<div class="newsfoot">';
			this.kBTit = 'alt="';
			this.kETit = '"';
		}
		//Ссылки на следующую и предыдущую страницы
		this.kBNeP = '<span class="nnext"><a href="http://online.anidub.com/';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = "id='film_main' src=";
		this.prefixSRL = 'http://vk.com';
		this.kPBUr = "http://pp.anidub-online.ru";
		this.kPEUr = '|';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(["' width='600'",'|'],['value="http://pp.anidub-online.ru', "value='http://pp.anidub-online.ru"]);
	
	}else if (sURL.toLowerCase().indexOf("seasonvar.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = 'href="/';
		this.kEUrl = '"';	
		this.kBDes = 'class="betterT alf-link">';
		this.kEDes = '</a>';
		this.kBNeP = '<a href="http://online-docfilm.com/';
		this.kENeP = '"><span class="b-content-navigation-next">';		
		//определение страницы со стримом
		this.kPStm = 'b-post-player';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<iframe src=\"', '<iframe src="'],['\"', '"']);
		
	}else if (sURL.toLowerCase().indexOf("online-docfilm.com") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<a class="b-content-item-link" href="http://online-docfilm.com/';
		this.kEUrl = '">';
		this.kBImg = '<img src="/';
		this.kEImg = '"';	
		this.kBDes = '<span class="b-content-item-description">';
		this.kEDes = '<div class="b-content-item">';
		this.kBTit = '<span class="link">';
		this.kETit = '</span>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://online-docfilm.com/';
		this.kENeP = '"><span class="b-content-navigation-next">';	
		//определение страницы со стримом
		this.kPStm = '<div class="b-post-content">';
		this.prefixSRL = 'vk.com';
		this.kPBUr = 'vk.com';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		//this.arrReplWordsPortal.push(['<iframe (.*?) src="', '<iframe src="'],['src=\"', 'src="']);
		
		
	}else if (sURL.toLowerCase().indexOf("minizal.net") >= 0){
		this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("search/?q=") >= 0){
			this.kBUrl = '<div class="heading"> <h3 class="mat-title"><a href="http://minizal.net/';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';	
			this.kBDes = 'class="entryLink">';
			this.kEDes = '<div class="row">';
			this.kBTit = 'class="entryLink">';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<div class="text-center classname"><a href="http://minizal.net/';
			this.kEUrl = '"';
			this.kBImg = '><img src="';
			this.kEImg = '"';		
			this.kBDes = '<ul class="reset infodate">';
			this.kEDes = '<div class="ssep">';
			this.kBTit = '<b class="lbl">Название:</b>';
			this.kETit = '</li>';
		}
		this.kBDisNeP="false";
		this.kBNeP = 'href="http://minizal.net/';
		this.kENeP = '<span><i class="pag_next">»</i></span>';		
		//определение страницы со стримом
		this.kPStm = 'frameborder="0"';
		this.kPBIm = 'class="fancybox"> <img src="';
		this.kPEIm = '"';
		this.kPBDs = '<ul class="reset infodate">';
		this.kPEDs = '<div class="vonline">';
		this.kPBUr = 'frameborder="0" src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['.txt"></iframe>', '.mp4v"></iframe>']);
		this.arrReplWordsPortal.push(['.flv"></iframe>', '.webm"></iframe>']);
		this.arrReplWordsPortal.push(['<iframe src="', 'frameborder="0" src="']);
		this.arrReplWordsPortal.push(['<iframe .*? src="', 'frameborder="0" src="']);
		this.arrReplWordsPortal.push(['"file":"', 'frameborder="0" src="']);
	  
	}else if (sURL.toLowerCase().indexOf("kinohome.net") >= 0){
			this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("search/?q=") >= 0){
			this.kBUrl = 'width:20%;"> <a href="http://kinohome.net/';
			this.kEUrl = '"';
			this.kBImg = '<img src="';
			this.kEImg = '"';	
			this.kBDes = '<font color ="000000">';
			this.kEDes = '<div class="eTitle">';
			this.kBTit = '>';
			this.kETit = '</font>';	
		}else{
			this.kBUrl = '<div class="eTitle" style="text-align:left;"> <a href="http://kinohome.net/';
			this.kEUrl = '"';
			this.kDesBImg =  '<img title="" src="';
			this.kDesEImg =  '"';
			this.kBDes = '>';
			this.kEDes = '</div><div class="eDetails" style="clear:both;">';
			this.kBTit = '>';
			this.kETit = '</a>';
		}
		//Ссылки на следующую и предыдущую страницы
		this.kBDisNeP="false";
		this.kBNeP = 'href="/';
		this.kENeP = '</a> <span class="swchItemDots"><span>...</span>';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="http://kinohome.net/go?';	
		this.kPBDs = '<div class="BodyOther2">';
		this.kPEDs = '<div class="BodyOther3">';
		this.kPBUr = '<iframe src="http://kinohome.net/go?';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
	
	}else if (sURL.toLowerCase().indexOf("my-hit.org") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		this.kBUrl = 'valign="top" class="even"><a href="/';
		this.kEUrl = '"><img';
		this.kBImg = 'src="/';
		this.kEImg = '"';	
		this.kBDes = '<td width="99%">';
		this.kEDes = '<a href="http://forum';
		this.kBTit = '">';
		this.kETit = '</a>"';
		//Ссылки на следующую и предыдущую страницы
		this.kBDisNeP="false";
		this.kBNeP = '</a><a href="/';
		this.kENeP = '">»</a></td></tr></table>';	
		//определение страницы со стримом
		this.kPStm = "url: '";
		this.kPBUr = "url: '";
		this.kPEUr = "',";
		this.kPBTt = 'title="';
		this.kPETt = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift([" - скачать бесплатно", ".mp4"]);
		this.arrReplWordsDesc.unshift(['<div class="fileinfodiv">', '<div class="fileinfodiv"></br>'],['<td width="1%" align="right" nowrap>', '<td width="1%" align="right" nowrap></br>']);
	  
	}else if (sURL.toLowerCase().indexOf("kinolist.net") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="image"> <a href="http://kinolist.net/';
		this.kEUrl = '">';
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = '<h3>';
		this.kEDes = '</article>';
		this.kBTit = '">';
		this.kETit = '</a>';
		this.kBNeP = '<li><a href="http://kinolist.net/';
		this.kENeP = '">&raquo;</a></li>';		
		//определение страницы со стримом
		this.kPStm = 'flashvars';
		this.kPBIm = '<div class="cover"> <img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<h1 style="margin-bottom:10px;">';
		this.kPEDs = '</section>';
		this.kPBUr = 'file":"';
		this.kPEUr = '&';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["<dl>", ""],["</dt>", ""]);
		this.arrReplWordsPortal.push(["file=", 'file":"']);
		
	}else if (sURL.toLowerCase().indexOf("filmsonline.com.ua") >= 0){
		if(sURL.toLowerCase().indexOf("filmsonline.com.ua/seriali/") >= 0){
			this.kBUrl = 'class="title"><a href="';
			this.kEUrl = '"';
			this.kDesBImg = 'http://filmsonline.com.ua/';
			this.kDesEImg = '.jpg';		
			this.kBDes = 'rel="bookmark"';
			this.kEDes = '<a class="readmore"';
			this.kBTit = '>';
			this.kETit = '</a>';
			this.kBNeP = '<a class="nextpostslink" rel="next" href="';
			this.kENeP = '">»</a>';		
			//определение страницы со стримом
			this.kPStm = "$.get('";
			this.kPBUr = "$.get('";
			this.kPEUr = '?';
			//добавляем к началу массива элементы замены
			this.arrReplWordsPortal.push(['<iframe src="', 'class="title"><a href="'],['" width="','"rel="bookmark">ПАПКА</a><a class="readmore"']);
			
		}else{
			this.prefixURL = prefix + '/';
			this.kBUrl = 'class="title"><a href="http://filmsonline.com.ua/';
			this.kEUrl = '"';
			this.kDesBImg = 'http://filmsonline.com.ua/';
			this.kDesEImg = '.jpg';	
			this.kBDes = 'rel="bookmark"';
			this.kEDes = '<a class="readmore"';
			this.kBTit = '>';
			this.kETit = '</a>';
			this.kBNeP = '<a class="nextpostslink" rel="next" href="http://filmsonline.com.ua/';
			this.kENeP = '">»</a>';			
			//определение страницы со стримом
			this.kPStm = '<iframe src="';
			this.kPBDs = '<h1 style="margin-bottom:10px;">';
			this.kPEDs = '</section>';
			this.kPBUr = '<iframe src="';
			this.kPEUr = '"';
		}
		this.arrReplWordsDesc.unshift(["смотреть онлайн", '']);
		this.arrReplWordsTitl.unshift([">",""]);
		
	}else if (sURL.toLowerCase().indexOf("ranet.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = "<div class='storycontent'> <a href='http://ranet.tv/";
		this.kEUrl = "'";
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = 'alt=';
		this.kEDes = 'class="more-link">';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://ranet.tv/';
		this.kENeP = '" >&raquo;</a></div>';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.kPBIm = '<p><img src="';
		this.kPEIm = '"';
		this.kPBDs = '<p><strong>';
		this.kPEDs = '</strong></p>';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift([' width="150" height="150" />', '']);
		this.arrReplWordsDesc.unshift(['смотреть', ''],['скачать', ''],['онлайн', ''],['бесплатно', '']);
		this.arrReplWordsPortal.push(['<div class="storycontent">', "<div class='storycontent'>"]);
		this.arrReplWordsPortal.push(['src="//www.youtube.com/', '<iframe src="http://www.youtube.com/']);
		
	}else if (sURL.toLowerCase().indexOf("lostfilmonline.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<span class="icon email"></span></a> </div> <a href="http://lostfilmonline.ru/';
		this.kEUrl = '">';
		this.kDesBImg = '<img src="';
		this.kDesEImg = '"';
		this.kBDes = 'style="font-size:12px;"';
		this.kEDes = '<div class="rt-comment-block">';
		this.kBTit = 'title="';
		this.kETit = '"';
		this.kBNeP = '<a href="http://ranet.tv/';
		this.kENeP = '" >&raquo;</a></div>';	
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['смотреть', ''],['скачать', ''],['онлайн', ''],['бесплатно', '']);
		
	}else if (sURL.toLowerCase().indexOf("vkino.net") >= 0){
		this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("search_result.php?") >= 0){
			this.kBUrl = '<div class="media_line_item"> <a href="';
		}else{
			this.kBUrl = '<div class="media_line_item odd"> <a href="';
		}
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '</a>';
		this.kEDes = '&hellip;';
		this.kBTit = 'class="heading">';
		this.kETit = '</a>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="';
		this.kENeP = 'class="nav_button">&gt;<span></span></a>';		
		//определение страницы со стримом
		this.kPStm = '<div class="ph after_player">';
		this.kPBIm = '<meta itemprop="thumbnailUrl" content="';
		this.kPEIm = '"';
		this.kPBUr = '<meta itemprop="url" content="';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("kino-dom.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="post info"> <a href="http://kino-dom.tv/';
		this.kEUrl = '"';
		this.kBImg = '<div style="background-image:url(';
		this.kEImg = ')"';
		this.kBDes = 'class="post-image">';
		this.kEDes = '</div>&hellip;</div>';
		this.kBTit = '<div class="post-title">';
		this.kETit = '</a>';
		this.kBNeP = '<li class="nav next"><a href="http://kino-dom.tv/';
		this.kENeP = '/">Вперед</a></a></li>';		
		//определение страницы со стримом
		this.kPStm = 'playlist';
		this.kPBIm = '<img src="';
		this.kPEIm = '"';
		this.kPBUr = 'file":"';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(['</div> <div class="post-title-eng">', ' / '],["</div>", ""]);
		this.arrReplWordsPortal.push(['<input type="hidden" name="pl" value="', '<div class="post info"> <a href="'],['value="videoplayer', '<ul><div style="background-image:url()"class="post-image"><div class="post-title">Папка №']);
		this.arrReplWordsPortal.push(["file=", 'file":"']);
		this.arrReplWordsPortal.push(['" /> <script', '</a></div>&hellip;</div>'],["_xml", "0"]);

	}else if (sURL.toLowerCase().indexOf("kinokong.net") >= 0 ||
			sURL.toLowerCase().indexOf("nowfilms.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG =  prefix;		
		this.kBUrl = '<span class="main-sliders-bg"> <a href="http://kinokong.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg  = '"';		
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://kinokong.net/';
		this.kENeP = '" rel="nofollow"><span class="thide pnext">';		
		//определение страницы со стримом
		this.kPStm = 'loadfile=';
		this.pref_IMG = prefix + '/';
		this.kPBIm = '<div class="full2"> <img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<div class="full_r disable_select">';
		this.kPEDs = '<div class="t-block">';
		this.kPBUr = "loadfile=";
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["Смотреть", ""],["онлайн", ""],["фильм", ""],["онлайн", ""]);
		this.arrReplWordsDesc.unshift(['<span class="new_movinfo">', '<span class="new_movinfo"><font color="#74b9fe">Дата добавления: </font>'],['<b><a href=', '</br><font color="#74b9fe">Комментариев: </font><a href='],['<span class="new_movinfo1">', '</br><font color="#74b9fe">Название: </font><span class="new_movinfo1">']);
		this.arrReplWordsDesc.unshift(['<span class="new_movinfo2">', '<span class="new_movinfo2"></br><font color="#74b9fe">Категории: </font>'],['<span class="new_movinfo3">', '<span class="new_movinfo3"></br><font color="#74b9fe">Описание: </font>']);
		this.arrReplWordsDesc.unshift(['<span class="new_movinfo4"> <b>', '<span class="new_movinfo4"></br><font color="#74b9fe">Качество: </font>'],['<span class="new_movkin">', '<span class="new_movkin"></br><font color="#74b9fe">Рейтинг Кинопоиск: </font>'],['<span class="new_movimdb">', '<span class="new_movimdb"></br><font color="#74b9fe">Рейтинг IMDb: </font>']);
		this.arrReplWordsPortal.push(['file":"', 'loadfile='],['.mp4,','.mp4"loadfile=']);
		this.arrReplWordsPortal.push(['pl:"', 'loadfile=']);
		this.arrReplWordsPortal.push(['<!-- imgbigp --> <img src="/', '<div class="full2"> <img src="/']);
		
	}else if (sURL.toLowerCase().indexOf("zagonka.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="boxgrid2 caption2"> <a href="http://zagonka.ru/';
		this.kEUrl = '"';
		this.prefixIMG=prefix;
		this.kBImg = 'src="';
		this.kEImg = '"';	
		this.kBDes = '<div class="cover2 boxcaption2">';
		this.kEDes = '</h3>';
		this.kBTit = '<h3>';
		this.kETit = '</h3>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://zagonka.ru/';
		this.kENeP = '">Далее</a></div></div></div>';		
		//определение страницы со стримом
		this.kPStm = 'itemprop="video"';
		this.kPBUr = '"file":"';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['",pl:"', '"file":"http://zagonka.ru']);
		
	}else if (sURL.toLowerCase().indexOf("uroki-online.com") >= 0 ||
		      sURL.toLowerCase().indexOf("compteacher.ru") >= 0){
		this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("uroki-online.com") >= 0){
			this.prefixIMG = prefix+"/";
			this.kBUrl = '<h2> <a href="http://uroki-online.com/';
		}else if(sURL.toLowerCase().indexOf("compteacher.ru") >= 0){
			this.kBUrl = '<h2> <a href="http://compteacher.ru/';
		}
		this.kEUrl = '"';
		if (sURL.toLowerCase().indexOf("uroki-online.com") >= 0){
			this.kDesBImg = '<img src="/';
		}else if(sURL.toLowerCase().indexOf("compteacher.ru") >= 0){
			this.kDesBImg = 'src="';
		}

		this.kDesEImg = '"';		
		this.kBDes = '>';
		this.kEDes = '<div class="arrow">';
		this.kBTit = 'alt="';
		this.kETit = '"';
		if (sURL.toLowerCase().indexOf("uroki-online.com") >= 0){
			this.kBNeP = '</span> <a href="http://uroki-online.com/';
		}else if(sURL.toLowerCase().indexOf("compteacher.ru") >= 0){
			this.kBNeP = '</span> <a href="http://compteacher.ru/';
		}
		this.kENeP = '">';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("tushkan.net") >= 0){
		this.prefixURL = prefix + '/';
		if (sURL.toLowerCase().indexOf("search/?q=") >= 0){
			this.kBUrl = '<div class="eTitle" style="text-align: left;"> <a title="Смотреть Онлайн" href="http://tushkan.net/';
			this.kEUrl = '"';
			this.kBDes = '<font face="Arial">';
			this.kEDes = '</div>';
			this.kBTit = '">';
			this.kETit = '</font>';
		}else{
			this.kBUrl = '<font face="Arial"><a href="http://tushkan.net/';
			this.kEUrl = '"';
			this.kBImg = 'src="';
			this.kEImg = '"';		
			this.kBDes = 'title=';
			this.kEDes = '<div class="news_descr"';
			this.kBTit = '"';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = ' href="/';
		this.kENeP = '><span>&raquo;</span></a>';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.kPBIm = 'tr><td class="eMessage"> <img src="';
		this.kPEIm = '"';
		this.kPBDs = '<div id="favorite_otvet"></div>';
		this.kPEDs = "<center><hr>";
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["Смотреть онлайн", ""],["смотреть",""],["бесплатно",""],["в хорошем качестве",""],["фильм онлай",""],["сериал онлайн",""]);
		this.arrReplWordsPortal.push(['frameborder="0" src="', '<iframe src="']);
		this.arrReplWordsPortal.push(['class="highslide"', '<a href=""']);
		
	}else if (sURL.toLowerCase().indexOf("www.online-life.me") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<div class="custom-poster" {favoretes_status_new}> <a href="http://www.online-life.me/';
		this.kEUrl = '"';
		this.kBImg = 'php?src=';
		this.kEImg = '&';	
		this.kBDes = '<div class="extra">';
		this.kEDes = '</div> <!-- всплывающая инфа -->';
		this.kBTit = '<b>';
		this.kETit = '</b>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://www.online-life.me/';
		this.kENeP = '">Вперед</a></div>';		
		//определение страницы со стримом
		this.kPStm = 'this.videoplayer';
		this.kPBIm = '<img itemprop="image" src="';
		this.kPEIm = '"';	
		this.kPBDs = '<span itemprop="name">';
		this.kPEDs = "<a href='#' rel='popover'";
		this.kPBUr = 'file:"';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['",pl:"', '']);
		this.arrReplWordsPortal.push(['m:"video",uid:"videoplayer', '']);
		this.arrReplWordsPortal.push(['//this.videoplayer =', 'file:"']);
		this.arrReplWordsPortal.push([' or ', '"file:"']);	
		
	}else if (sURL.toLowerCase().indexOf("multyasha.com") >= 0){
		this.prefixURL = "http://multyasha.com" + '/';
		this.prefixIMG = prefix + '/';
		this.kBUrl = '</h2> <a href="http://multyasha.com/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';	
		this.kBDes = "title=";
		this.kEDes = "</dd> </dl>";
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://multyasha.com/';
		this.kENeP = '">Далее</a></div></div></td></tr></table>';		
		//определение страницы со стримом
		this.kPStm = '<iframe';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["</dt>", ""],["<dd>", ""],['width="180"/>', ""]);
		this.arrReplWordsDesc.unshift(["смотреть онлайн", ""]);
		this.arrReplWordsPortal.push(['"360\" src=\"', '<iframe src="'],["'", '"'],["/embed/index.php?", 'vk.com/embed/index.php?']);		
	  
	}else if (sURL.toLowerCase().indexOf("www.cinemaplayer.ru") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = 'class="btl"><a href="http://www.cinemaplayer.ru/';
		this.kEUrl = '"';
		this.kBImg = '<!--dle_image_begin:';
		this.kEImg = '|-->';	
		this.kBDes = "title=";
		this.kEDes = '<div class="clr"></div>';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://www.cinemaplayer.ru/';
		this.kENeP = '"><span class="thide pnext">Вперед</span></a>';	
		//определение страницы со стримом
		this.kPStm = 'iframe';
		this.kPBIm = '<!--dle_image_begin:';
		this.kPEIm = '|-->';	
		this.kPBDs = '<!--dle_image_end-->';
		this.kPEDs = '<div style="clear:both">';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		this.kPBTt = 'header: " ';
		this.kPETt = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['/>', '</br>']);
		this.arrReplWordsPortal.push(['url720', 'url480'],['url240', 'url480'],['url360', 'url480']);
 
	}else if (sURL.toLowerCase().indexOf("s1.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("s2.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("s3.onlinefilmx.ru") >= 0 ||
			sURL.toLowerCase().indexOf("onlinefilmx2.tv") >= 0){
		this.prefixURL = prefix + '/';
		//определение страницы со стримом
		this.kPStm = 'src="';
		this.kPBUr = 'src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(["file : '", 'src="'],["'", '"']);
	  
	}else if (sURL.toLowerCase().indexOf("vipzal.tv") >= 0){
		this.kBUrl = '<h3 class="entry-title"><a href="';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';	
		this.kBDes = '<img title="';
		this.kEDes = '<!-- <div style="float: left;';
		this.kBTit = 'alt="';
		this.kETit = '"/>';
		this.kBNeP = '<a class="nextpostslink" href="';
		this.kENeP = '"';		
		//определение страницы со стримом
		this.kPStm = '<script>files["';
		this.kPBUr = '"]="';
		this.kPEUr = '";</script>';
		this.kPBTt = '<span id="fm-video_title">';
		this.kPETt = '</span></div>';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["Смотреть", ""],["онлайн", ""],["фильм", ""],["онлайн", ""],['</li>', ""],['alt="opaque"/>', "Видео Файл"]);
		this.arrReplWordsDesc.unshift([' - VipZal.TV"', ""],['</li>', ""]);
		this.arrReplWordsTitl.unshift(["opaque", "Видео Файл"]);
		this.arrReplWordsPortal.push(["<iframe src='", '<h3 class="entry-title"><a href="']);
		this.arrReplWordsPortal.push(["' width", '"']);
		this.arrReplWordsPortal.push(['<iframe src="', '<h3 class="entry-title"><a href="']);
		this.arrReplWordsPortal.push(['wmode="', '<img title="alt="']);
		this.arrReplWordsPortal.push(['"></iframe>', '"/><!-- <div style="float: left;']);
		
	}else if (sURL.toLowerCase().indexOf("animult.tv") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix+"/";
		this.kBUrl = '<div class="blocknews"><h1> <a href="http://animult.tv/';
		this.kEUrl = '"';
		this.kDesBImg = '<img src="/';
		this.kDesEImg = '"';
		this.kBDes = '>';
		this.kEDes = '</a><div style="padding-left:45px; padding-top:5px;">';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://animult.tv/';
		this.kENeP = '">Далее</a></div></div>';		
		//определение страницы со стримом
		this.kPStm = 'player_id = "player_uppod"';
		this.kPBIm = '<td valign="top"><img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '</div></div></div></td><td valign="top" style="padding-left:10px;">';
		this.kPEDs = '</td></tr></table>';
		this.kPBUr = 'pl: "';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['file: "', 'pl: "']);
		this.arrReplWordsDesc.unshift(['смотреть онлайн', '']);
		
	}else if (sURL.toLowerCase().indexOf("kino24.cc") >= 0){
		this.prefixURL = prefix + '/';
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="main-news"> <a href="http://kino24.cc/';
			this.kEUrl = '">';
			this.kBImg = '<img src="/';
			this.kEImg = '"';		
			this.kBDes = '<h2 class="btl">';
			this.kEDes = '</h2>';
			this.kBTit = '">';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<div class="main-news-image"> <a href="http://kino24.cc/';
			this.kEUrl = '">';
			this.kBImg = '<img src="/';
			this.kEImg = '"';	
			this.kBDes = '<h2>';
			this.kEDes = '</h2>';
			this.kBTit = '">';
			this.kETit = '</a>'
		}
		this.kBNeP = ' <div class="nextprev"> <a href="http://kino24.cc/';
		this.kENeP = '"><span class="pnext">Вперед</span></a>';		
		//определение страницы со стримом
		this.kPStm = '<iframe src="';
		this.pref_IMG = prefix + '/';
		this.kPBIm = 'class="full-news-image"> <img src="/';
		this.kPEIm = '"';	
		this.kPBDs = '</div></div><br><br>';
		this.kPEDs = '</div>';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(["'", '"'],['um.uplay.*?"', '<iframe src="']);
		
	}else if (sURL.toLowerCase().indexOf("rufilm.tv") >= 0){
		this.kBUrl = '<div class="image-poster"';
		this.kEUrl = 'html">';
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = '<div class="label-quality">';
		this.kEDes = '<div class="rating hidden-sm"';
		this.kBTit = '<div class="name-full">';
		this.kETit = '</div>';
		this.kBNeP = '<a class="last" href="http://rufilm.tv/';
		this.kENeP = '"';
		//определение страницы со стримом
		this.kPStm = '<iframe src=';
		this.kPBIm = '<div class="image-poster hidden-sm hidden-xs "> <img src="';
		this.kPEIm = '"';	
		this.kPBDs = '<table class="info-table">';
		this.kPEDs = '</table>';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['<h3 class="single-title-description">', '<div class="panel-body"><p>']);
		this.arrReplWordsPortal.push(['смотреть онлайн', '.mp4<br />'],['серия<br />', 'серия.mp4<br />']);
		this.arrReplWordsPortal.push(["'", '"']);

	}else if (sURL.toLowerCase().indexOf("multxit.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<li class="item"> <a href="http://multxit.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<div class="full-link">';
		this.kEDes = '</li>';
		this.kBTit = '">';
		this.kETit = '</a>';
		this.kBNeP = '<a class="nextpostslink" rel="next" href="http://multxit.ru/';
		this.kENeP = '">';		
		this.kPStm = '"file":"';
		this.kPBUr = '"file":"';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['<iframe [.*?] src="', '"file":"'],['<iframe src="', '"file":"'],['"file": "', '"file":"']);
		this.arrReplWordsPortal.push(["src: 'http://multxit.ru/", '<li class="item"> <a href="http://multxit.ru/'],[".txt'", '.txt"']);
		this.arrReplWordsPortal.push(['<div class="podel">', '<img src=""<div class="full-link">">Список файлов</a></li>']);
	
	}else if (sURL.toLowerCase().indexOf("kinotochka.net") >= 0){
		this.prefixURL = prefix+"/";
		if (sURL.toLowerCase().indexOf("?do=search") >= 0){
			this.kBUrl = '<div class="SearchresultPoster"><a href="http://kinotochka.net/';
			this.kEUrl = '"';
			this.kBImg = '<!--dle_image_begin:';
			this.kEImg = '||';
			this.kBDes = 'alt=';
			this.kEDes = '<div class="SearchresultFavorites"></div>';
			this.kBTit = '"';
			this.kETit = '"';
		}else{
			this.kBUrl = '</span> <a href="http://kinotochka.net/';
			this.kEUrl = '"';
			this.kBImg = '<!--dle_image_begin:';
			this.kEImg = '||';
			this.kBDes = '</a></div> ';
			this.kEDes = '</a>, </div>';
			this.kBTit = '<div class="SpritAll ShortstoryTitleRu">';
			this.kETit = '</div>';	
		}
		this.kBDisNeP="false";
		this.kBNeP = '<li><a href="http://kinotochka.net/';
		this.kENeP = '">Вперед</a></li>';		
		this.kPStm = '","file":"';
		this.kPBUr = '","file":"';
		this.kPEUr = '"';
		this.arrReplWordsDesc.unshift(['<div class="ShortstoryYearCountryGenre">', "</br>Жанры:"]);
		this.arrReplWordsPortal.push(["480,720]", "720"]);
		this.arrReplWordsPortal.push(['"pl":"', '","file":"']);
		this.arrReplWordsPortal.push(['","file=', '","file":"']);
	
	}else if (sURL.toLowerCase().indexOf("www.linecinema.org") >= 0){
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix+"/";
		this.kBUrl = '<h1> <a href="http://www.linecinema.org/';
		this.kEUrl = '"';
		this.kDesBImg = '<img src="/';
		this.kDesEImg = '"';
		this.kBDes = '>';
		this.kEDes = '</table>';
		this.kBTit = '>';
		this.kETit = '</a>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://www.linecinema.org/';
		this.kENeP = '">Далее</a>';	
		this.kPStm = 'file:';
		this.kPBUr = 'file: "';
		this.kPEUr = '"';
		this.arrReplWordsDesc.unshift(['сериал', ''],['Онлайн', ''],['Смотреть', '']);
		this.arrReplWordsDesc.unshift(["<li>", ""],["</li>", ""],["<b>", ""],["</span>", ""],["<table>", ""],["<tr>", ""]);
		this.arrReplWordsDesc.unshift(['return false;">[0-9]</a>', 'return false;">'],['<li class="current-rating" style="width:[0-9]%;">[0-9]</li>', ""]);
		this.arrReplWordsDesc.unshift(['<li class="current-rating" style="width:[0-9][0-9]%;">[0-9][0-9]</li>', ""]);
		this.arrReplWordsDesc.unshift(['<li class="current-rating" style="width:[0-9][0-9][0-9]%;">[0-9][0-9][0-9]</li>', ""]);
		
	}else if (sURL.toLowerCase().indexOf("baskino.com") >= 0){
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="postcover"> <a href="http://baskino.com/';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';
		this.kBDes = '<div class="posttitle">';
		this.kEDes = '<div class="postrate">';
		this.kBTit = '">';
		this.kETit = '</a>';
		this.kBDisNeP="false";		
		this.kBNeP = '<a href="http://baskino.com/';
		this.kENeP = '">Вперед</a></div></div>';
		this.kPStm = 'file: "';		
		this.kPBIm = '<img itemprop="image" title="';
		this.kPEIm = '" width="';
		this.kPBDs = '<div class="info">';
		this.kPEDs = '</span></a></span></td>';
		this.kPBUr = 'file: "';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['<iframe src="http://vk.com/', 'file: "http://vk.com/']);
		this.arrReplWordsPortal.push(['src="//www.youtube.com', 'file: "http://www.youtube.com']);
		
	}else if (sURL.toLowerCase().indexOf("onlinemultfilmy.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<a class="mainlink" href="http://onlinemultfilmy.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img class="alignleft" src="';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '<div class="cat-post">';
		this.kBTit = '"';
		this.kETit = '"';	
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://onlinemultfilmy.ru/';
		this.kENeP = '" class="nextpostslink">»</a>';
		this.kPStm = '<h2 class="pre_video_h2">';
		this.kPBIm = '<div class="post-block"><div class="l-block hcard"> <img src="';
		this.kPEIm = '"';
		this.kPBUr = '"SERIES_LIST":_';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['/> <span>', '<font color="#74b9fe"></br>Название: </font>'],['<div class="post-info">', '<font color="#74b9fe"></br>Инфо.: </font>']); 
		this.arrReplWordsPortal.push(["<div class='wp-pagenavi'>", '<div class="cat-post">'],["&hd=1", '&hd=1"'],["&hd=2", '&hd=2"'],["&hd=3", '&hd=3"']);
		this.arrReplWordsPortal.push(['www.youtube.com', '"SERIES_LIST":_www.youtube.com'],['"http://video.sibnet.ru/', '"SERIES_LIST":_http://video.sibnet.ru/'],['"http://vk.com/video_ext.php?', '"SERIES_LIST":_http://vk.com/video_ext.php']);
		
	}else if (sURL.toLowerCase().indexOf("videomax.org") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="image " > <a href="http://www.videomax.org/';
		this.kEUrl = '"';
		this.kBImg = '<img class="thumb" src="';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = 'onmouseover';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<!--noindex--><a href="';
		this.kENeP = '" title="Следующая" rel="nofollow">>></a>';
		this.kPStm = 'video_url:';
		this.kPBUr = "video_url: '";
		this.kPEUr = "'";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(["video_alt_url: '", "video_url: '"],["video_alt_url2: '", "video_url: '"],["video_alt_url3: '", "video_url: '"],["video_alt_url4: '", "video_url: '"]);
		
	}else if (sURL.toLowerCase().indexOf("new-kino.net") >= 0) {
			this.prefixURL = prefix+"/";
			this.prefixIMG = prefix+"/";
		if (sURL.toLowerCase().indexOf("do=search&subaction=search") >= 0){
			this.kBUrl = ') <a href="http://new-kino.net/';
			this.kEUrl = '"';
			this.kDesBImg = '<!--TBegin--><a href="/';
			this.kDesEImg = '"';
			this.kBDes = "<h1>";
			this.kEDes = '<h4>';
			this.kBTit = "title='";
			this.kETit = "'";
		}else{
			this.kBUrl = '<h1><a href="http://new-kino.net/';
			this.kEUrl = '">';
			this.kDesBImg = '<img src="/';
			this.kDesEImg = '"';
			this.kBDes = ">";
			this.kEDes = '<ul class="unit-rating">';
			this.kBTit = '> ';
			this.kETit = '</a>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://new-kino.net/';
		this.kENeP = '">Далее</a>';	
		this.kPStm = '<div id="linkskino">';
		this.kPBIm = '<!--TBegin--><a href="';
		this.kPEIm = '"';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['смотреть онлайн', '']);
		this.arrReplWordsPortal.push(['<iframe [.*?] src="', '<iframe src="']);
		
	}else if (sURL.toLowerCase().indexOf("filmodrom.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		if (sURL.toLowerCase().indexOf("do=search&subaction=search") >= 0){
			this.kBUrl = '<strong class="autor"><a href="http://filmodrom.net/';
			this.kEUrl = '"';
			this.kBDes = '>';
			this.kEDes = '<div class="notes-light">';
			this.kBTit = '>';
			this.kETit = '</a>';
		}else{
			this.kBUrl = '<td width="100%"><h4><a href="http://filmodrom.net/';
			this.kEUrl = '"';
			this.kBImg = '<img src="/';
			this.kEImg = '"';
			this.kBDes = '<td valign="top" style="padding-left:10px;">';
			this.kEDes = '<table width="100%">';
			this.kBTit = '<strong>Название:</strong>';
			this.kETit = '<br>';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://filmodrom.net/';
		this.kENeP = '">Вперёд';
		this.kPStm = 'param name="flashvars"';
		this.pref_IMG = prefix + '/';
		this.kPBIm = 'td valign="top"><img src="/';
		this.kPEIm = '"';
		this.kPBDs = '<td valign="top" style="padding-left:10px;">';
		this.kPEDs = '</table>';
		this.kPBUr = 'file=';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['онлайн фильм', ''],['смотреть онлайн', '']);
		this.arrReplWordsPortal.push(['pl=', 'file=']);

	}else if (sURL.toLowerCase().indexOf("mirclipov.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="main-news-fon"> <a href="http://mirclipov.com/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '/>';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://mirclipov.com/';
		this.kENeP = '">вперед</a>';
		this.kPStm = '<div class="video">';
		this.kPBUr = '<iframe title="YouTube video player" width="680" height="500" src="';
		this.kPEUr = '&';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(['Скачать клип', '']);
		this.arrReplWordsPortal.push(['Дыши со мной', 'Дыши со мной.mp4']);
		
	}else if (sURL.toLowerCase().indexOf("vepizode.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<ul class="list"> <li> <a href="http://vepizode.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '>';
		this.kEDes = '<div class="stars">';
		this.kBTit = '<i>';
		this.kETit = '</span>';
		this.kBNeP = '<li class="right"><a href="http://vepizode.net/';
		this.kENeP = '" ><span>Следующая</span>';
		this.kPStm = '"pl":"';
		this.kPBUr = '"pl":"';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['</i> </a> <span class="e_name">', " - "]);
		this.arrReplWordsDesc.unshift(['</i> </a> <noindex>', " - "]);
		this.arrReplWordsDesc.unshift(['</span> <span>', " - "]);
		this.arrReplWordsDesc.unshift(['<i>', ""],["</a></span> <span>"," - "]);
		this.arrReplWordsPortal.push(['</p></noindex> </li>', '<ul class="list">']);
		this.arrReplWordsPortal.push(['<span class="s"><a href="http://vepizode.net/', '<ul class="list"> <li> <a href="http://vepizode.net/']);
		this.arrReplWordsPortal.push(['sezon/">', 'sezon/"><i>']);
		this.arrReplWordsPortal.push(['<span class="descr"></span>', '<div class="stars">']);
		
	}else if (sURL.toLowerCase().indexOf("o-nline.ws") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="imagebg"> <a href="http://o-nline.ws/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<span class="tt opacity">';
		this.kEDes = '<div class="custom-1">';
		this.kBTit = '>';
		this.kETit = '</span>';
		this.kBDisNeP="false";
		this.kBNeP = 'href="http://o-nline.ws/';
		this.kENeP = '" onclick="spages';
		this.kPStm = "http://vk.com/video_ext.php?";
		this.prefixSRL = 'http://vk.com/video_ext.php?';
		this.kPBUr = "http://vk.com/video_ext.php?";
		this.kPEUr = "'";
		
	}else if (sURL.toLowerCase().indexOf("fitness-video.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<h1 class="heading"><a href="http://fitness-video.net/';
		this.kEUrl = '"';
		this.prefixIMG = prefix+"/";
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '<div class="clr">';
		this.kBTit = "title='";
		this.kETit = "'";		
		this.kBNeP = '<span class="nnext"><a href="http://fitness-video.net/';
		this.kENeP = '">Вперед</a></span>';
		this.kPStm = '<embed src="';
		this.kPBUr = '<embed src="';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("hdkinoklub.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="eTitle"style="text-align:left;"><h2><a href="http://hdkinoklub.ru/';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';
		this.kBDes = 'title=';
		this.kEDes = '<div class="eDetails"';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = 'href="http://hdkinoklub.ru/';
		this.kENeP = '">Далее</a>';
		this.kPStm = 'http://vk.com/video_ext.php?';
		this.kPBIm = 'class="poster_big" src="';
		this.kPEIm = '"';
		this.kPBDs = '<div class="full_history_info">';
		this.kPEDs = '<div id="fullseasons">';
		this.prefixSRL = 'http://vk.com/video_ext.php?';
		this.kPBUr = 'http://vk.com/video_ext.php?';
		this.kPEUr = "'";	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['/> <div class="teaser_desc3">', '']);
		this.arrReplWordsPortal.push(['" frameborder', "'"]);
		
	}else if (sURL.toLowerCase().indexOf("horrors-online.ru") >= 0) {
		this.prefixURL = prefix+"/";
		if (sURL.toLowerCase().indexOf("?do=search") >= 0) {
			this.kBUrl = '<span class="argmore"><a href="http://horrors-online.ru/';
			this.kEUrl = '"';
			this.kBDes = "title='";
			this.kEDes = '<div class="moreinfo">';
			this.kBTit = "title='";
			this.kETit = "'";
		}else{
			this.kBUrl = '<div class="binner"> <h3><a href="http://horrors-online.ru/';
			this.kEUrl = '"';
			this.kBImg = '<!--TBegin:';
			this.kEImg = '|';
			this.kBDes = "title='";
			this.kEDes = '<div class="moreinfo">';
			this.kBTit = "title='";
			this.kETit = "'";
		}
		this.kBDisNeP="false";
		this.kBNeP = '- <a href="http://horrors-online.ru/';
		this.kENeP = '"> ТУДА---) </a></center></div>';
		this.kPStm = '<iframe src="';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['смотреть онлайн', '']);
		this.arrReplWordsPortal.push(["http://185.56.28.196/vid/vid.php?", "http://vk.com/video_ext.php?"]);
		
	}else if (sURL.toLowerCase().indexOf("www.videokub.me") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '"> <a href="http://www.videokub.me/';
		this.kEUrl = '"';
		this.kDesBImg = 'src="';
		this.kDesEImg = '"';
		this.kBDes = '<span class="time">';
		this.kEDes = '</a>';
		this.kBTit = '<b>';
		this.kETit = '</b>';
		this.kBNeP = '</span> <a href="/';
		this.kENeP = '"';
		this.kPStm = 'uid:"player", file:"';
		this.kPBUr = 'uid:"player", file:"';
		this.kPEUr = '/"';	
		//добавляем к началу массива элементы замены
		
	}else if (sURL.toLowerCase().indexOf("latino-serialo.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<table id="preview_video"> <tr> <td><h2><a href="http://latino-serialo.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = 'title=';
		this.kEDes = '</tr>';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://latino-serialo.ru/';
		this.kENeP = '">Далее</a>';
		this.kPStm = '<option value="';
		this.prefixSRL = 'vk.com';
		this.kPBUr = '<option value="';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['/></a></a>', ''],['<font color', '</br><font color']);
		
	}else if (sURL.toLowerCase().indexOf("kinoschka.at.ua") >= 0) {
		this.prefixURL = prefix+"/";
		if (sURL.toLowerCase().indexOf("search/?q=") >= 0){
			this.kBUrl = 'normal"><a href="http://kinoschka.at.ua/';
			this.kEUrl = '"';	
			this.kBDes = '>';
			this.kEDes = '</a>';
			this.kBTit = '>';
			this.kETit = '<';
		}else{
			this.kBUrl = '</strong> </a> <a href="http://kinoschka.at.ua/';
			this.kEUrl = '"';
			this.kDesBImg = 'src="';
			this.kDesEImg = '"';			
			this.kBDes = '<img alt=';
			this.kEDes = '<span class="entDots">';
			this.kBTit = '"';
			this.kETit = '"';	
		}
		this.kBDisNeP="false";
		this.kBNeP = 'href="';
		this.kENeP = '><span>&raquo;</span></a></div>';
		this.kPStm = 'player_des22';
		this.kPBUr = '<iframe id="player_des22" src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(["'[0-9]'", ""]);
		this.arrReplWordsPortal.push(["spages", ""]);
		this.arrReplWordsPortal.push(['" onclick="', ""]);
		
	}else if (sURL.toLowerCase().indexOf("http://onlainfilm.ucoz.ua") >= 0) {
		this.prefixURL = prefix+"/";	
		this.kBUrl = '<td style="text-align: left; font-size: 10px; padding-left: 10px;" align="center" width="100%"><a href="/';
		this.kEUrl = '"';
		this.kDesBImg = '<img src="';
		this.kDesEImg = '"';
		this.kBDes = '<span style="font-size: 10pt;" class="xml-text"';
		this.kEDes = '<div align="left"></div>';
		this.kBTit = '>';
		this.kETit = '</span>';
		this.kBNeP = '</span></b> <a class="swchItem1" href="http://onlainfilm.ucoz.ua/';
		this.kENeP = '"';
		this.kPStm = '<iframe src="';
		this.kPBIm = '<div align="center"><img src="';
		this.kPEIm = '"';
		this.kPBDs = '<div align="center"><b>';
		this.kPEDs = '<!--ENDIF-->';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["онлайн", ''],["смотреть", '']);
		this.arrReplWordsTitl.unshift([">", ""]);
		this.arrReplWordsPortal.push(['&amp;', '&']);
		this.arrReplWordsPortal.push(['<td style="text-align: left; font-size: 10px; padding-left: 10px;" align="center" width="100%"><a href="http://onlainfilm.ucoz.ua/', '<td style="text-align: left; font-size: 10px; padding-left: 10px;" align="center" width="100%"><a href="/']);
	 
	}else if (sURL.toLowerCase().indexOf("kino-live.org") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix;
		if (sURL.toLowerCase().indexOf("do=search&subaction=search&story") >= 0){
			this.kBUrl = '<div class="more"><a href="http://kino-live.org/';
			this.kEUrl = '"';
			this.kBImg = '<!--dle_image_begin:';
			this.kEImg = '|left-->';
			this.kBDes = 'title=';
			this.kEDes = '<div class="clear">';
			this.kBTit = '"';
			this.kETit = '/><!--dle_image_end-->';
		}else{
			this.kBUrl = '<h1><a href="http://kino-live.org/';
			this.kEUrl = '"';
			this.kBImg = '<!--dle_image_begin:';
			this.kEImg = '|left-->';
			this.kBDes = 'title=';
			this.kEDes = '<div class="clear">';
			this.kBTit = '"';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://kino-live.org/';
		this.kENeP = '">Далее</a></div>';
		this.kPStm = '<param name="flashvars" value=';
		this.kPBIm = '<!--dle_image_begin:';
		this.kPEIm = '|left-->';
		this.kPBDs = '<!--dle_image_end-->';
		this.kPEDs = '</tr>';	
		this.kPBUr = 'file=';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["/></a><!--TEnd-->", ''],["/><!--dle_image_end-->", '']);
		this.arrReplWordsPortal.push(["'", '"'],["pl=","file=http://kino-live.org"]);
		this.arrReplWordsPortal.push(["<!--TBegin:", '<!--dle_image_begin:']);

	}else if (sURL.toLowerCase().indexOf("veterok.tv") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="imagechannel"> <a href="http://veterok.tv/';
		this.kEUrl = '"';
		if (sURL.toLowerCase().indexOf("?search_id=") >= 0){
			this.kBImg = 'src="';
			this.kEImg = '"';
			this.kBDes = '<span class="title">';
			this.kEDes = '</span>';
			this.kBTit = '<span class="title">';
			this.kETit = '</span>';
		}else{
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = 'title=';
			this.kEDes = '</span>';
			this.kBTit = '"';
			this.kETit = '"';
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://veterok.tv/';
		this.kENeP = '">&raquo;</a>';		
		this.kPStm = '<iframe src="http://veterok.tv/';
		this.kPBIm = '"';
		this.prefixSRL = 'http://veterok.tv/';
		this.kPBUr = '<iframe src="http://veterok.tv/';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(["- ВетерокТВ", ""],['/>', ''],['<span class="duration">', '</br>Время: ']);
	
	}else if (sURL.toLowerCase().indexOf("vk.com") >= 0){
		this.prefixURL = prefix + '/';
		//определение страницы со стримом
		this.kPStm = '"url480":"';
		this.kPBUr = '"url480":"';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['_[720,480,360].flv', '_720.flv']);
		this.arrReplWordsPortal.push(['url720', 'url480'],['url240', 'url480'],['url360', 'url480']);
		
	}else if (sURL.toLowerCase().indexOf("www.redtube.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<li class="first-in-row"> <a href="/';
		this.kEUrl = '"';
		this.kBImg = 'data-src="';
		this.kEImg = '"';
		this.kBDes = '<span class="video-title">';
		this.kEDes = '</a>';
		this.kBDisNeP="false";
		this.kBNeP = 'href = "/';
		this.kENeP = '><b><span class="pline"></span>Next</b></a></div>';	
		this.kPStm = "redtube_flv_player";
		this.kPBUr = '<video src="';
		this.kPEUr = '"';
		this.kPBTt = 'type="';
		this.kPETt = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="time">', '<br/><br/><br/>Время: ']);
		this.arrReplWordsDesc.unshift(['<div class="right">', '<div class="right"><br/>Рейтинг: ']);
		this.arrReplWordsTitl.unshift(["video/mp4", "18+.mp4"]);
		this.arrReplWordsTitl.unshift(["multipart/form-data", "18+.mp4"]);
		this.arrReplWordsPortal.push(['</li><li > <a href="/', '<li class="first-in-row"> <a href="/']);
		this.arrReplWordsPortal.push(['<source src="', '<video src="']);		
		
	}else if (sURL.toLowerCase().indexOf("anysex.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<li class="item "> <a href="/';
		this.kEUrl = '"';
		this.kBImg = '<img class="thumb" src="';
		this.kEImg = '"';
		this.kBDes = 'onmouseout="KT_rotationStop(this)"/>';
		this.kEDes = '</li>';
		this.kBTit = '<span class="tit">';
		this.kETit = '</span>';
		this.kBNeP = '</span> <a href="/';
		this.kENeP = '" title="Страница';
		this.kPStm = "video_url: '";
		this.kPBUr = "video_url: '";
		this.kPEUr = "'";
		this.kPBTt = 'title="';
		this.kPETt = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<span class="time">', 'Время: ']);
		this.arrReplWordsDesc.unshift(['<span class="tit">', '</br>Название: <span class="tit">']);
		this.arrReplWordsDesc.unshift(['<div class="desc fulldesc">', '</br>Описание: ']);
		this.arrReplWordsPortal.push(['<span>Новинки</span>', ''],["preview_url: '", 'title="18+.mp4"']);
		
	}else if (sURL.toLowerCase().indexOf("www.xtube.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<h3 class="Card__title"><a href="/';
		this.kEUrl = '"';
		this.kDesBImg = 'data-thumb-bg="';
		this.kDesEImg = '">';
		this.kBDes = 'title="';
		this.kEDes = '<article class="Card Card--video">';
		this.kBTit = '">';
		this.kETit = '"';
		this.kBNeP = '<a class="Pager__next" href="/';
		this.kENeP = '"><span>NEXT</span>';		
		this.kPStm = 'flashvars.video_url = "';
		this.kPBUr = 'flashvars.video_url = "';
		this.kPEUr = '"';
		this.kPBTt = 'attributes.id = "';
		this.kPETt = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="x-card-info__runtime fright">', '</br>Время: ']);
		this.arrReplWordsDesc.unshift(['<div class="x-card-info__description clearb">', '</br>Описание: ']);
		this.arrReplWordsPortal.push(['xPlayer', '18+.mp4'])
		this.arrReplWordsPortal.push(['"mp4_high":"', 'title="18+(180p).mp4" "mp4_normal":"'],['""mp4_ultra"":"', 'title="18+(240p).mp4" "mp4_normal":"'],['"3gp":"', 'title="18+(480p).mp4" "mp4_normal":"']);
		this.arrReplWordsPortal.push(['"flv":"', 'title="18+(180p).3gp" "mp4_normal":"'],['"mp4_720":"', 'title="18+(480p).flv" "mp4_normal":"'],['createHtml5Player', 'title="18+(720p).flv"']);
		
	}else if (sURL.toLowerCase().indexOf("www.lenkino.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="col-lg-3 col-md-4 col-xs-6 item"> <a href="http://www.lenkino.com/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '<div class="item-meta item-views">';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = 'href="';
		this.kENeP = '" class="btn btn-lg" rel="nofollow">';
		this.kPStm = ' file: "';
		this.kPBIm = 'image: "';
		this.kPEIm = '"';
		this.kPBUr = ' file: "';
		this.kPEUr = '"';
		this.arrReplWordsDesc.unshift(['>', '></br>']);
		this.arrReplWordsPortal.push(['<div class="clearfix text-center nav-page"> <a href="http://www.lenkino.com/', '<div class="clearfix text-center nav-page"> <a href="/'])
		//добавляем к началу массива элементы замены
		
	}else if (sURL.toLowerCase().indexOf("letseks.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<td><a title="';
		this.kEUrl = '">';
		this.kBImg = 'src="';
		this.kEImg = '"';
		this.kBDes = '<center>';
		this.kEDes = '</center>';
		this.kBNeP = '<a rel="nofollow" href="/';
		this.kENeP = '">&gt;</a></li></ul></div>';		
		this.kPStm = 'player.swf';
		this.kPBUr = '"videoSrc","';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены

	}else if (sURL.toLowerCase().indexOf("hdpornoonline.net") >= 0){
		this.prefixURL = prefix + '/';
		this.kBUrl = '<h2><a href="http://hdpornoonline.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = "alt=";
		this.kEDes = "/>";
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = "</span><a href='http://hdpornoonline.net/";
		this.kENeP = "' class='nextpostslink'>";		
		//определение страницы со стримом
		this.kPStm = 'value="video_url=';
		this.kPBUr = 'value="video_url=';
		this.kPEUr = '&amp;';
		
	}else if (sURL.toLowerCase().indexOf("www.paradisehill.tv") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="item_zag"> <a href="';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '>';
		this.kBTit = '"';
		this.kETit = '"';		
		this.kBNeP = '</span></li> <li><a href="';
		this.kENeP = '">';
		this.kPStm = 'var films= "';
		this.kPBUr = 'var films= "';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['.mp4', '.mp4" var films= "']);
		this.arrReplWordsPortal.push(['<div class="item_zag"> <a href="/', '<div class="item_zag"> <a href="']);
			
	}else if (sURL.toLowerCase().indexOf("www.hdtubes.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="image " > <a href="http://www.hdtubes.net/';
		this.kEUrl = '"';
		this.kBImg = '<img class="thumb" src="';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '<div class="rating"';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBNeP = '</span> <a href="/';
		this.kENeP = '" title="';
		this.kPStm = "video_url: '";
		this.kPBUr = "video_url: '";
		this.kPEUr = "/',";		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="length">', '<br/>Время: '],['<div class="added">', '<br/>Добавили: ']);
		this.arrReplWordsPortal.push(['onmouseover=', '<img src=""onmouse=']);
		this.arrReplWordsPortal.push(["video_alt_url: '", "video_url: '"],["video_alt_url2: '", "video_url: '"]);
		this.arrReplWordsPortal.push(["video_alt_url3: '", "video_url: '"],["video_alt_url4: '", "video_url: '"]);
	
	}else if (sURL.toLowerCase().indexOf("brazzers-hd.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="item-thumbnail"> <a href="/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBDisNeP="false";
		this.kBNeP = ' <li><a href="/';
		this.kENeP = '">&raquo;</a></li>';
		this.kPStm = '<source src="';
		this.kPBIm = 'poster="';
		this.kPEIm = '"';
		this.kPBUr = '<source src="';
		this.kPEUr = '"';
	
	}else if (sURL.toLowerCase().indexOf("pornovhd.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<tr><td><h2><a href="http://pornovhd.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBNeP = '<div class="prev_link"><a href="http://pornovhd.net/';
		this.kENeP = '">Вперед</a>';
		this.kPStm = '<iframe';
		this.prefixSRL = '';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['<iframe (.*?) src="', '<iframe src="']);
	
	}else if (sURL.toLowerCase().indexOf("pornk.tv") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="thumb"> <a href="http://pornk.tv/';
		this.kEUrl = '" class="hl">';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '">';
		this.kEDes = '<div class="rating">';
		this.kBTit = '>';
		this.kETit = '</div>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="/';
		this.kENeP = '" title="Вперед">>></a>';
		this.kPStm = '<div id="player" class="player">';
		this.kPBIm = '<meta name="thumbnail" content="';
		this.kPEIm = '"/>';
		this.kPBDs = '<span itemprop="name">';
		this.kPEDs = '</span></h1>';
		this.kPBUr = '<meta itemprop="contentURL" content="';
		this.kPEUr = '"';
		this.kPBTt = '<div class="';
		this.kPETt = '">';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="time">', '<br/><br/><br/>Время: ']);
		this.arrReplWordsTitl.unshift(["info", "18+.mp4"]);
		
	}else if (sURL.toLowerCase().indexOf("www.youjizz.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<a class="frame" href="/';
		this.kEUrl = "'";
		this.kBImg = 'data-original="';
		this.kEImg = '">';
		this.kBDes = '<span id="title1">';
		this.kEDes = '<span id="miniatura">';
		this.kBTit = '>';
		this.kETit = '</span>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="';
		this.kENeP = "'>Next";
		this.kPStm =  '<iframe id="videoplayer"';
		this.kPBUr = '<div style="width: 200px; height: 90px"> <a href="';
		this.kPEUr = '"';
		this.kPBTt = 'float:left;" >';
		this.kPETt = '</a>';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<div class="time">', '<br/><br/><br/>Время: ']);
		this.arrReplWordsTitl.unshift(["Download This Video", "18+.mp4"]);
		this.arrReplWordsPortal.push(["href='", 'href="']);
		
	}else if (sURL.toLowerCase().indexOf("pornomisto.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<h2><a href="http://pornomisto.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = 'alt=';
		this.kEDes = '<div class="info_right">';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://pornomisto.ru/';
		this.kENeP = '" class="nextpostslink">»</a>';
		this.kPStm = '<iframe src="';
		this.kPBUr = '<iframe src="';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['/>', ''],['<p class="duration">', '<font color="#498dff">ВРЕМЯ:</font> '],['<p class="views">', '<font color="#498dff">ПРОСМОТРОВ:</font> ']);
		
	}else if (sURL.toLowerCase().indexOf("onlain-porno-site.ru") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '</div></div></div><a href="http://onlain-porno-site.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://onlain-porno-site.ru/';
		this.kENeP = '"><span class="thide pnext">Вперед</span></a>';
		this.kPStm = '<iframe src="/video/online.php?';
		this.prefixSRL = 'http://vk.com/video_ext.php?';
		this.kPBUr = '<iframe src="/video/online.php?';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("fapa.tv") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<li class="thumb"> <a href="http://fapa.tv/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<span class="time">';
		this.kEDes = '</li>';
		this.kBTit = '<p class="desc">';
		this.kETit = '<span class="info">';
		this.kBDisNeP="false";
		this.kBNeP = '<li><a href="/';
		this.kENeP = '" class="btn-silver btn-next" title="Далее"></a></li>';
		this.kPStm = "video_url: '";
		this.kPBUr = "video_url: '";
		this.kPEUr = "/'";		

	}else if (sURL.toLowerCase().indexOf("ru-porn.tv") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '</span> <a href="http://ru-porn.tv/';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';
		this.kBDes = '<figcaption>';
		this.kEDes = '</figure>';
		this.kBTit = '</a>';
		this.kETit = '</a>';	
		this.kBNeP = '</span><a href="http://ru-porn.tv/';
		this.kENeP = '"';
		this.kPStm = '<div class="cnt">';
		this.prefixSRL = 'http://ru-porn.tv';
		this.kPBUr = '"fileUrl": "';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['"fileUrl": "http://ru-porn.tv', '"fileUrl": "']);
		this.arrReplWordsDesc.push(['">', '"></a>'],['&#9654;', ''],['<div class="rdur">','<div class="rdur"></br> Время: ']);
		
	}else if (sURL.toLowerCase().indexOf("porno4you.org") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="short-story"> <a href="http://porno4you.org/';
		this.kEUrl = '"';
		this.kBImg = "src='";
		this.kEImg = "'";
		this.kBDes = '<h2 class="short-title">';
		this.kEDes = '<div class="c1data">';
		this.kBTit = '<class="title">';
		this.kETit = '</a>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://porno4you.org/';
		this.kENeP = '">Next</a></div></div>';
		this.kPStm = '<iframe id="hvideo" class="framevid" src="';
		this.kPBUr = '<iframe id="hvideo" class="framevid" src="';
		this.kPEUr = '"';
		this.arrReplWordsPortal.push(['<h2 class="short-title">', '<h2 class="short-title"><class="title">']);
		this.arrReplWordsDesc.push(['</b>','']);
		this.arrReplWordsDesc.push(['<div class="short-time">','<div class="short-time"></br>Время: ']);
	
	}else if (sURL.toLowerCase().indexOf("www.vporn.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = 'class="bx"> <a href="http://www.vporn.com/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBNeP = '<a class="next" href="http://www.vporn.com/';
		this.kENeP = '"';
		this.kPStm = '<div class="video_panel">';
		this.kPBUr = 'flashvars.videoUrlLow = "';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsPortal.push(['flashvars.videoUrlLow2', 'flashvars.videoUrlLow']);
		this.arrReplWordsPortal.push(['flashvars.videoUrlMedium', 'flashvars.videoUrlLow']);
		this.arrReplWordsPortal.push(['flashvars.videoUrlMedium2', 'flashvars.videoUrlLow']);
		this.arrReplWordsPortal.push(['flashvars.videoUrlHD', 'flashvars.videoUrlLow']);
		this.arrReplWordsPortal.push(['flashvars.videoUrlHD2', 'flashvars.videoUrlLow']);
		
	}else if (sURL.toLowerCase().indexOf("vtraxe.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="shortstory"> <a href="http://m.vtraxe.com/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<div class="shorttitle">';
		this.kEDes = '<ul class="unit-rating">';
		this.kBTit = 'title="';
		this.kETit = '"';
		this.kBNeP = '<b class="next"><a href="http://m.vtraxe.com/';
		this.kENeP = '">&rarr;</a></b>';
		this.kPStm = '<iframe';
		this.prefixSRL = 'http://www.hdtubes.net';
		this.kPBUr = 'src="http://www.hdtubes.net';
		this.kPEUr = '"';
		//добавляем к началу массива элементы замены	
		this.arrReplWordsPortal.push(["vtr_nmobile_player.php", "nvc_iframe_embed.php"]);
		
	}else if (sURL.toLowerCase().indexOf("www.bangyoulater.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '"><a href="/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '</span>';
		this.kEDes = '</article>';
		this.kBTit = '<span class="title">';
		this.kETit = '</span>';
		this.kBDisNeP="false";
		this.kBNeP = '<li><a href="/';
		this.kENeP = '">Next &raquo;</a>';
		this.kPStm = '<div class="player">';
		this.kPBUr = "var __videoUrl = '";
		this.kPEUr = "'";
		this.kPBTt = "var __videoRendering = '";
		this.kPETt = "'";
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(["Flash", "18+.mp4"]);
		this.arrReplWordsTitl.unshift(["HTML5 video", "18+.mp4"]);
		
	}else if (sURL.toLowerCase().indexOf("youporn.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="wrapping-video-box"> <a href="/';
		this.kEUrl = '">';
		this.kBImg = '<img src="';
		this.kEImg = '"';
		this.kBDes = '<p class="videoTitle"';
		this.kEDes = '</a>';
		this.kBTit = 'title="';
		this.kETit = '"';
		//this.kBDisNeP="false";
		this.kBNeP = '<link rel="next" href="http://ru.youporn.com/';
		this.kENeP = '"';
		this.kPStm = '<video id="player-html5" src="';
		this.kPBUr = '<video id="player-html5" src="';
		this.kPEUr = '"';	
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift([">", ""]);
		this.arrReplWordsDesc.unshift(['<span class="duration">', '</br>Длительность: '],['<span class="rating up">',"</br>Рейтинг: "],['</p>','']);
		//this.arrReplWordsTitl.unshift(["Player", "18+.mp4"]);
		this.arrReplWordsPortal.push(['data-original="', '<img src="']);
		
	}else if (sURL.toLowerCase().indexOf("www.dojki.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<img id="i';
		this.kEUrl = '"';
		this.kBImg = 'data-original="';
		this.kEImg = '"';
		this.kBDes = '<br>';
		this.kEDes = '<div>';
		this.kBTit = '<br>';
		this.kETit = '</a>';
		this.kBNeP = '<a class="next_page" rel="next" href="';
		this.kENeP = '"';
		this.kPStm = '$.get("/';
		this.prefixSRL = 'http://www.dojki.com/';
		this.kPBUr = '$.get("/';
		this.kPEUr = '"';		
		//добавляем к началу массива элементы замены
		this.arrReplWordsTitl.unshift(["Player", "18+.mp4"]);
		
	}else if (sURL.toLowerCase().indexOf("pornostate.net") >= 0) {
		this.prefixURL = prefix+"/";
		this.prefixIMG = prefix + '/';
		this.kBUrl = '<div class="shortstory"> <a href="http://pornostate.net/';
		this.kEUrl = '"';
		this.kBImg = '<img src="/';
		this.kEImg = '"';
		this.kBDes = '<h2 class="title">';
		this.kEDes = '</div>';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="http://pornostate.net/';
		this.kENeP = '">Вперед</a></div></div>';
		this.kPStm = '<iframe src="/embed/';
		this.kPBDs = '<h1>';
		this.kPEDs = '</span>';
		this.prefixSRL = 'http://vk.com/video_ext.php?';
		this.kPBUr = '<iframe src="/embed/index.php?';
		this.kPEUr = '"';

	}else if (sURL.toLowerCase().indexOf("www.spankwire.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="thmb-wrapper"> <a href="/';
		this.kEUrl = '">';
		this.kBDirImg = 'true';
		this.kBImg = 'src="';
		this.kEImg = '.jpg';
		this.kBDes = 'title="';
		this.kEDes = '"';
		this.kBNeP = 'right"><a href="/';
		this.kENeP = '" onclick="" class="text-shadow"> Next <span class="relative guimet-pager">';
		this.kPStm = '.mp4';
		this.kPBUr = "video_url'";
		this.kPEUr = "'";
		this.kPBTt = "title='";
		this.kPETt = "'";
		this.arrReplWordsPortal.push(["playerData.cdnPath180 = '", "video_url'"]);
		this.arrReplWordsPortal.push(["playerData.cdnPath240 = '", "title='18+(180p).mp4' video_url'"]);
		this.arrReplWordsPortal.push(["playerData.cdnPath480 = '", "title='18+(240p).mp4' video_url'"]);
		this.arrReplWordsPortal.push(["playerData.cdnPath720 = '", "title='18+(480p).mp4' video_url'"]);
		this.arrReplWordsPortal.push(["playerData.screenShot = '", "title='18+(720p).mp4'"]);

	}else if (sURL.toLowerCase().indexOf("hellporno.com") >= 0) {
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="video-thumb"><a href="http://hellporno.com/';
		this.kEUrl = '"';
		this.kBImg = '<video poster="';
		this.kEImg = '"';
		this.kBDes = '<img alt="';
		this.kEDes = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="/';
		this.kENeP = '" class="next">';
		this.kPStm = "video_url:";
		this.kPBUr = "video_url: '";
		this.kPEUr = "/?";
		//добавляем к началу массива элементы замены
		this.arrReplWordsDesc.unshift(['<ul><li>', '</br>Просмотров: '],["</li><li>","</br>Добавлено: "],["<span>","Времмя: "],["</span>","</br>Название: </span>"]);
		this.arrReplWordsPortal.push(['</ul> </a> <a href="', '</ul> </a> <div class="kvs-cpv-230x172"> <a href="']);
		this.arrReplWordsPortal.push(["video_alt_url: '", "video_url: '"]);
		
	}else if (sURL.toLowerCase().indexOf("radiopotok.ru") >= 0){
		this.prefixURL = prefix;
		this.kBNeP = '<li class="next"><a href="/';
		this.kENeP = '" rel="canonical">следующая »</a>';
		this.kPBUr = 'data-stationlogo="1" data-stream1="';
		this.kPEUr = '"';
		this.kPBTt = 'rel="canonical">';
		this.kPETt = "</a>";
		
	}else if (sURL.toLowerCase().indexOf("www.clipos.ru") >= 0){
		this.prefixURL = prefix+"/";
		this.kBUrl = '<td align="left" width="220px"> <a href="/';
		this.kEUrl = '"';
		this.kDesBImg = '<img src="';
		this.kDesEImg = '"';
		this.kBDes = 'title=';
		this.kEDes = '</tr>';
		this.kBTit = '"';
		this.kETit = '"';
		this.kBDisNeP="false";
		this.kBNeP = '<a href="/';
		this.kENeP = "> <b>Следующая ></b> </a> </center>";
		this.kPStm = 'mce_src="';
		this.kPBUr = 'mce_src="';
		this.kPEUr = '"';
		
	}else if (sURL.toLowerCase().indexOf("trancelaciya.com") >= 0){
		this.prefixURL = prefix+"/";
		this.kBUrl = '<div class="thumb"> <a href="/';
		this.kEUrl = '"';
		this.kBImg = 'src="';
		this.kEImg = '"';		
		this.kBDes = '<h6>';
		this.kEDes = '</h6>';
		this.kBTit = '">';
		this.kETit = '</a>';
		this.kBNeP = '<a title="На следующую страницу" href="/';
		this.kENeP = '"';
		this.kPStm = '<div class="player">';
		this.prefixSRL = 'http://www.youtube.com';
		this.kPBUr = 'src="//www.youtube.com';
		this.kPEUr = '?';
		this.arrReplWordsDesc.unshift(['Скачать', ''],["клип",""]);
		this.arrReplWordsPortal.push(['www.youtube-nocookie.com/v/', 'www.youtube.com/watch?v=']);
		
	}else if (sURL.toLowerCase().indexOf("www.clipafon.ru") >= 0){
		this.prefixURL = prefix+"/";
		this.kBUrl = '</li> <li> <a href="http://www.clipafon.ru/';
		this.kEUrl = '"';
		this.kBImg = '<img src="';
		this.kEImg = '"';	
		this.kBDes = 'alt="';
		this.kEDes = '"';
		this.kBDisNeP="false";
		this.kBNeP = '</a><a href="';
		this.kENeP = '">след. &raquo;</a></div>';
		this.kPStm = "iframe width=";
		this.prefixSRL = 'http://www.youtube.com/watch';
		this.kPBUr = 'http://www.youtube.com/watch';
		this.kPEUr = '"';
		this.arrReplWordsDesc.unshift(['Скачать', ''],["клип",""]);
		this.arrReplWordsPortal.push(['<li class="new"> <a href="http://www.clipafon.ru/', '</li> <li> <a href="http://www.clipafon.ru/']);		
		
	}else if (sURL.toLowerCase().indexOf("metalvideo.com") >= 0){
		this.prefixURL = prefix+"/";
		if(sURL.toLowerCase().indexOf("metalvideo.com/newvideos") >= 0){
			this.kBUrl = 'width="10"><a href="http://metalvideo.com/';
			this.kEUrl = '">';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = 'alt="';
			this.kEDes = '"><a href="http://metalvideo';
			this.kBTit = 'alt="';
			this.kETit = '"><a href="http://metalvideo';
		}else{
			this.kBUrl = '<div class="video_i"> <a href="http://metalvideo.com/';
			this.kEUrl = '">';
			this.kBImg = '<img src="';
			this.kEImg = '"';
			this.kBDes = '<span class="artist_name">';
			this.kEDes = '</div>';
			this.kBTit = '<span class="artist_name">';
			this.kETit = "</a>";
		}
		this.kBDisNeP="false";
		this.kBNeP = '<a href="';
		this.kENeP = '">next &raquo;</a></div>';
		this.kPStm = "file: '";
		this.kPBUr = "file: '";
		this.kPEUr = "'";
		this.arrReplWordsDesc.unshift(['<span class="song_name">', ' - ']);
		this.arrReplWordsDesc.unshift(['" class="tinythumb" width="53" height="40" align="left" border="1" />', ' - ']);
	
	}else if (sURL.toLowerCase().indexOf("mediaserver") >= 0){
		this.prefixURL = prefix;
		this.kBUrl = '<a class="medialist" href="';
		this.kEUrl = '"';
		this.kBDirImg = 'true';
		this.kBImg = '<img class="imagelist" src="';
		this.kEImg = '"';
		this.kBDes = '>';
		this.kEDes = '</a>'
		this.kBDisNeP="false";
		this.kBNeP = '<a class="navigate" href="';
		this.kENeP = '"> <img class="imagenavigate" src="/presentation/images/next24_h.png" alt="Следующая страница" hspace=2/>';
		this.kPStm = 'для МедиаСервера здесь должна быть несуществующая строка, чтобы парсер не заходил на страницу стрима';
		this.kEAdd = this.kPEUr;
		this.arrReplWordsImge.unshift(['/presentation/images', prefix + '/presentation/images']);
		this.arrReplWordsPortal.push(['\s*title="[^"]*"', ""]);
	}
}

//обработка ссылки
XURL.Proceed = function(sURL,POST,POST_SEND){
	if(sURL.toLowerCase().indexOf("www.zoomby.ru") >= 0){
		if(sURL.toLowerCase().indexOf("?offset=") < 0){
			sURL=sURL+"?offset=0&country=&year=0&catalog_sort=2&p=1"
			//catalog_sort=1 По популярности
			//catalog_sort=2 По новизне
			//catalog_sort=3 По алфавиту
			//catalog_sort=4 По рейтингу
		}
	}
	sURL=XURL.trim(sURL);
	//инициализируем поисковые блоки
	XURL.InitPortal(sURL);
	//определяем формат выходного плейлиста
	//очищаем строку-приемник конечного плейлиста
	this.outTXT="";
	this.fComplete=false;
	if (sURL.toLowerCase().indexOf(this.keyUSB.toLowerCase()) == 0){
		XURLdata=new Array();
		XURLdata_next = new Array();
		XURL.outTXT = XURL.GetUSBMedia(sURL);
		XURL.fComplete = true;
		//инициализируем связь с интернетом
	}else{ 
		XURL.abortXmlHTTP();
		this.xmlHTTP = CreateXmlHttp();
		//отсылаем пустой запрос и ловим страницу в строкуhttp://filmenter.ru/smarttv/
		console.log("http://xs.lnka.ru/xhr.php?u="+encodeURIComponent(sURL));
		XURL.setRequestUrl("GET", "http://xs.lnka.ru/xhr.php?u="+encodeURIComponent(sURL), this.fMode); //?асинхронно
			this.xmlHTTP.onreadystatechange = function (){ 
				if (XURL.xmlHTTP.readyState == 4){ 
					XURLdata=new Array();
					XURLdata_next = new Array();
					XURL.Parser(); 
				}
			} 
		//this.xmlHTTP.setRequestHeader("User-Agent","Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.2.13) Gecko/20101203 Firefox/3.6.13");
		//this.xmlHTTP.setRequestHeader("Content-Type","text/html; charset=windows-1251");
		this.xmlHTTP.send(); 
	} 
}

//отмена запроса
XURL.stopRequest = function (){
	clearTimeout(XURL.timeout);
	clearInterval(XURL.fHasXML);
	if (XURL.xmlHTTP != null){
		XURL.xmlHTTP.abort();
		XURL.xmlHTTP=null;
	}
}

XURL.abortXmlHTTP = function (){
	if (XURL.xmlHTTP != null){
		if (XURL.trim(this.phpGate) == '' && !this.flagDebug){
			XURL.xmlHTTP.abort();
			//XURL.xmlHTTP.destroy();
		}
		XURL.xmlHTTP = null;
	}
}

//из полученного ответа вытаскиваем нужные данные
XURL.Parser = function (){
var TMPnStart, sOut, sUrl, prevUrl, sImg, aImg, nImg, sDes, sTit, sLogo, sRes, fStreams;
	//очищаем строку результата работы парсера
	sRes = "";
	sOut = "";
	//если ответ от сервера корректный
	if (this.xmlHTTP.status == 200){	
		if (sOut == ""){
			sOut = XURL.DelTrash(this.xmlHTTP.responseText);
			this.xmlHTTP = null;
		}else{
			sOut = XURL.DelTrash(sOut);
		}
		for (var i in this.arrReplWordsPortal){
			sOut = sOut.replace(new RegExp(this.arrReplWordsPortal[i][0], 'gim'), this.arrReplWordsPortal[i][1]);
		}
		this.nStart = 0;
		this.NoP = this.NoP + 1;
		if(this.mURL.toLowerCase().indexOf("fs.to") >= 0||
			this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
			this.mURL.toLowerCase().indexOf("brb.to") >= 0){
			sOut=sOut.replace(/\\n/g,"");
			sOut=sOut.replace(/\\t/g,"");
			sOut=sOut.replace(/\\/g,"");
		}else if(this.mURL.toLowerCase().indexOf("cinem.tv") >= 0){
			sOut=sOut.replace(/\|/g,"");
		}
		//console.log(sOut)
		if (sOut.toLowerCase().indexOf(this.kPStm) < 0 && this.kBUrl!=""){
			while (this.nStart >= 0){
				sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kBUrl, this.kEUrl, false));
				console.log("sUrl: "+sUrl)
				if (sUrl != ""){
					if (this.mURL.toLowerCase().indexOf("letseks.net") >= 0 ||
						this.mURL.toLowerCase().indexOf("letseks.tv") >= 0){
						sUrl = sUrl.split('href="')[1];;
					}
					if(this.mURL.toLowerCase().indexOf("www.lenkino.com") >= 0){
						sUrl = this.prefixURL +"embed?id="+sUrl
					}else if(this.mURL.toLowerCase().indexOf("onlain-porno-site.ru") >= 0){
						sUrl = "http://xfgb.ru/" + sUrl;
					}else{
						sUrl = this.prefixURL + sUrl;
					}
					if (this.mURL.toLowerCase().indexOf("ex.ua") >= 0 && 
						sUrl.toLowerCase().indexOf("?v=1,0&per=20") < 0){
						sUrl = sUrl + "?v=1,0&per=20";
					}
					if (this.mURL.toLowerCase().indexOf("rufilm.tv") >= 0){
						sUrl = sUrl.split('href="')[1];
						sUrl = sUrl +"html";
					}
					if (this.mURL.toLowerCase().indexOf("my-hit.org") >= 0){
						sUrl = sUrl + "/online";
					}
					sUrl = XURL.ReplWords(sUrl, this.arrReplWordsFrwd);
					TMPnStart = this.nStart;
					if(this.kBDirImg == 'true'){
						sImg = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kBImg, this.kEImg, true));
						if (this.mURL.toLowerCase().indexOf("www.spankwire.com") >= 0){
							var Imgg = sImg.split('src="')[1]
							if(typeof Imgg != "undefined"){
								sImg =  Imgg +".jpg"
							}else{
								sImg =  sImg +".jpg"
							}
						}
					}else{
						sImg = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kBImg, this.kEImg, false));
						if (this.mURL.toLowerCase().indexOf("ex.ua") >= 0){
							sImg = sImg.split('ex.ua')[1];
							sImg = "http://www.ex.ua"+sImg
						}
					}
					nImg = this.nStart;
					this.nStart = TMPnStart;
					if (this.prefixIMG!=""){
						if (sImg.toLowerCase().indexOf("http") < 0){
							if (sImg != ""){
								sImg=this.prefixIMG+sImg
							}
						}
					}
					console.log("sImg: "+sImg)
					if (sImg != ""){
						sImg = XURL.ReplWords(sImg, this.arrReplWordsImge);
					}
					if (this.mURL.toLowerCase().indexOf("kinohome.net") >= 0 && this.mURL.toLowerCase().indexOf("search/?q=") >= 0 
					|| this.mURL.toLowerCase().indexOf("new-kino.net") >= 0){
							sDes = XURL.FindVal(sOut, this.nStart, this.kBDes, this.kEDes, true);
					}else{
						sDes = XURL.FindVal(sOut, this.nStart, this.kBDes, this.kEDes, false);
						if (this.mURL.toLowerCase().indexOf("fs.to") >= 0||
							this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
							this.mURL.toLowerCase().indexOf("brb.to") >= 0){
							sDes=sDes.replace('<span class="b-poster-detail__field">','</br><font color="#74b9fe">Год: </font>');
							sDes=sDes.replace('<span class="b-poster-detail__field">','</br><font color="#74b9fe">В ролях: </font>');
						}
					}
					if (this.kDesBImg!="" || this.kDesEImg!=""){
						if (this.mURL.toLowerCase().indexOf("filmsonline.com.ua") >= 0){					
							sImg = XURL.FindVal(sDes, 0, this.kDesEImg, "", false);
							sImg = XURL.trim(XURL.FindVal(sDes, this.nStart, this.kDesBImg, this.kDesEImg, true));
							sImg = "http://films-online.com.ua/" + sImg+".jpg";								
						}else{
							sImg = XURL.trim(XURL.FindVal(sDes, 0, this.kDesBImg, this.kDesEImg, false));
						}
						this.nStart = TMPnStart;
						if (this.prefixIMG!=""){
							if (sImg.toLowerCase().indexOf("http") < 0){
								if (sImg != ""){
									sImg=this.prefixIMG+sImg
								}
							}
						}
						if (sImg != ""){
							sImg = XURL.ReplWords(sImg, this.arrReplWordsImge);
						}
					}
					if (sDes != ""){
						sDes = this.prefixTAG + sUrl + this.endedTAG + sDes;
						sDes = XURL.ReplWords(sDes, this.arrReplWordsDesc);
						TMPnStart = this.nStart;
						sTit = XURL.FindVal(sDes, 0, this.kBTit, this.kETit, false);
						this.nStart = TMPnStart;
						if (sTit != ""){
							sTit = XURL.trim(sTit);
						}else{
							sTit = sDes;
							while (sTit != sTit.replace(new RegExp(this.sPatTag, 'gim'), " ")){
								sTit = sTit.replace(new RegExp(this.sPatTag, 'gim'), " ");
							}
							sTit = XURL.DelTrash(sTit);
						}
						if (this.mURL.toLowerCase().indexOf("onlainfilm.ucoz.ua") >= 0){
							sDes=XURL.beautiful_text(sDes)
						}
						sDes = XURL.DelWords(sDes);
						sDes = XURL.DelTrash(sDes);
						sTit = XURL.ReplWords(sTit, this.arrReplWordsTitl);
						if (sImg != ""){
							sLogo = XURL.ReplWords(sImg, this.arrReplWordsFrwd);
							sImg = sImg;
						}else{
							sLogo = "";
						}
						if(this.mURL.toLowerCase().indexOf("ex.ua") >= 0){
							sDes=XURL.beautiful_text(sDes,sTit)
						}
						sDes=sDes.replace(/<\/?(iframe)[^>]*?(>|$)/gi,'');
						sDes=sDes.replace(sTit,'');
						if (sTit != "" && sUrl != ""){
							sTit = unescape(sTit);
							if (XURL.checkNameExt(sUrl, this.arrVideoExt) || 
								XURL.checkNameExt(sUrl, this.arrAudioExt)){
								sRes = XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, true);
							}else if (!XURL.checkNameExt(sUrl, this.arrImageExt) && 
									!XURL.checkNameExt(sUrl, this.arrTrashExt)){
									sRes = XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, false);
								}
							}
						}
				}else if (this.nStart >= 0){
						sDes = XURL.FindVal(sOut, this.nStart, this.kBDes, this.kEDes, false);;
				}
			}
			//NEXT PAGE
			if (this.kBDisNeP=="false"){
				sUrl = XURL.FindVal(sOut, 0, this.kENeP, "", false);
				//и ищем начало ссылки в обратную сторону
				sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kBNeP, this.kENeP, true));
				if (this.mURL.toLowerCase().indexOf("kino-dom.tv") >= 0){
					if (sUrl != ""){
						sUrl = sUrl+"/";
					}
				}else if (this.mURL.toLowerCase().indexOf("kinoschka.at.ua") >= 0 ||
							this.mURL.toLowerCase().indexOf("kinohome.net") >= 0){
					sUrl=sUrl.split('(')[0];
				}else if (this.mURL.toLowerCase().indexOf("www.anibox.ru") >= 0 ||
						this.mURL.toLowerCase().indexOf("tushkan.net") >= 0){
					sUrl=sUrl.split('onclick')[0];
				}else if (this.mURL.toLowerCase().indexOf("www.redtube.com") >= 0 ||
						this.mURL.toLowerCase().indexOf("minizal.net") >= 0){
					sUrl= sUrl.split('"')[0];
				}
			}else if (this.mURL.toLowerCase().indexOf("tree.tv") >= 0){
				if(sRes!=""){
					var tree_url= this.mURL.split('&page')[0]
					sUrl = tree_url+ "&page="+this.NoP.toString();
				}
			}else if (this.mURL.toLowerCase().indexOf("fs.to") >= 0 ||
						this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
						this.mURL.toLowerCase().indexOf("brb.to") >= 0){
				if(sRes!=""){
					if (this.mURL.toLowerCase().indexOf("&start=") >= 0){
						var brb_url= this.mURL.split('&start=')[0]
					}else{
						var brb_url= this.mURL
					}
					if(this.NoP_fs<0){
						this.NoP_fs=0
					}
					this.NoP_fs=this.NoP_fs+20
					sUrl = brb_url+"&start="+this.NoP_fs+"&length=4"+"&page="+this.NoP.toString();
				}
			}else{
				sUrl = XURL.trim(XURL.FindVal(sOut, 0, this.kBNeP, this.kENeP, false));
			}
			if (sUrl != ""){
				if (this.mURL.toLowerCase().indexOf("cinem.tv") >= 0){
					if (sUrl.length>6){
						var url="http://cinem.tv"
					}else if (this.mURL.toLowerCase().indexOf("/p/") >= 0){
						var url = this.mURL.split("/p/")[0]
						url =url +"/"
					}else{
						var url = this.mURL
					}
					sUrl = url+ sUrl;
				}else if (this.mURL.toLowerCase().indexOf("www.dojki.com") >= 0){			
					var dojki=this.mURL.split("/"+sUrl-1)[0]
					sUrl=dojki+"/"+sUrl
				}else if (this.mURL.toLowerCase().indexOf("www.zoomby.ru") >= 0){
					var url=this.mURL.split("&p=")[0]
					sUrl=url+"&p="+sUrl
				}else if (this.mURL.toLowerCase().indexOf("rufilm.tv") >= 0){
					var rufilm = this.mURL.split('/page')[0]
					sUrl = rufilm + "/page/"+this.NoP.toString();;
				}else if (this.mURL.toLowerCase().indexOf("tree.tv") >= 0 ||
						this.mURL.toLowerCase().indexOf("fs.to") >= 0||
						this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
						this.mURL.toLowerCase().indexOf("brb.to") >= 0){
					sUrl = sUrl;
				}else if (this.mURL.toLowerCase().indexOf("kinoylei.org") >= 0){
					var page = sUrl.split('http://')[1]
					sUrl="http://"+page
				}else if (this.mURL.toLowerCase().indexOf("multyasha.com") >= 0){
					sUrl=prefix+"/"+sUrl;
				}else if(this.mURL.toLowerCase().indexOf("www.lenkino.com") >= 0){	
					if (sUrl.toLowerCase().indexOf("http") < 0){
						if (sUrl != ""){							
							sUrl = prefix + sUrl;
						}
					}
				}else{
					if (sUrl.toLowerCase().indexOf("http") < 0){
						if (sUrl != ""){
							sUrl = this.prefixURL + sUrl;
						}
					}
				}
				sLogo = "images/menu_icon/icon_next.png";
				sUrl = XURL.ReplWords(sUrl, this.arrReplWordsFrwd);					
				if(this.MODE_parser=="2_0"){
					sUrl = XURL.Result_next_p(Widget_txt.msg_page + " > " + this.NoP.toString(), sUrl, Widget_txt.msg_page, 0, sLogo, false);
				}else{
					sUrl = XURL.Result_next_p(Language.msg_page + " > " + this.NoP.toString(), sUrl, Language.msg_page_desc, 0, sLogo, false);
				}
				sRes = sUrl + sRes + sUrl;
			}
			if (sRes == ""){
				if (this.mURL.toLowerCase().indexOf("search") >= 0){
					XURL.error=1;
					sRes = XURL.Results_array("Ничего не найдено!", "", "<font color='skyblue'><b>По вашему запросу ничего не найдено!</b></font>", 0, "", false);
				}else{
					XURL.error=2;
					sRes = XURL.Results_array("ПУСТО!", "", "<font color='skyblue'><b>Данные не найдены!</b></font>", 0, "", false);
				}
			}
		}else{
			if(this.kPBUr!=""){
			TMPnStart = this.nStart;
			sImg = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBIm, this.kPEIm, false));
			if (this.mURL.toLowerCase().indexOf("baskino.com") >= 0 ||
				this.mURL.toLowerCase().indexOf("kinoylei.org") >= 0 ||
				this.mURL.toLowerCase().indexOf("911.to") >= 0){
				sImg= sImg.split('src="')[1];
			}
			this.nStart = TMPnStart;
			if (this.pref_IMG!= ""){
				if (sImg.toLowerCase().indexOf("http") < 0){
					if (sImg != ""){
						sImg = this.prefixURL  + sImg;
					}
				}
			}
			if (sImg != ""){
				sImg = XURL.ReplWords(sImg, this.arrReplWordsImge);
			}
			sLogo = "";	
			sDes = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBDs, this.kPEDs, false));				
			if (sDes != ""){
				sDes = XURL.ReplWords(sDes, this.arrReplWordsDesc);
				sDes = XURL.DelWords(sDes);
				sDes = XURL.DelTrash(sDes);
				if (sImg != ""){
					sLogo = XURL.ReplWords(sImg, this.arrReplWordsFrwd);
					sImg = sImg;	
				}
			}else{
				this.nStart = TMPnStart;
			}			
			fStream = false;	
			while (this.nStart >= 0){
				TMPnStart = this.nStart;
				sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, 'href="/get/', '"', false));
				if (sUrl != ""){
					sUrl = this.prefixSRL+"get/"+ sUrl;
					this.kPBTt = '<span class="b-file-new__link-material-filename-text">';
					this.kPETt = '</span>';
					fStream = true;
				}else{
					this.nStart = TMPnStart;
					sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, '<a href="#" name="fl', '"', false));
					if (sUrl != ""){
						sUrl = this.mURL.substring(0, this.mURL.indexOf("?")) + '?ajax&folder=' + sUrl;
						this.kPETt = '</li>';
						fStream = true;
					}else if (!fStream){
						this.nStart = TMPnStart;
						sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBUr, this.kPEUr, false));
						console.log("kPBUr: "+sUrl)
						if (this.mURL.toLowerCase().indexOf("paradisehill.tv") >= 0){
							sUrl = sUrl.split('|||')[1];
						}
						if (this.mURL.toLowerCase().indexOf("kinoprosmotr") >= 0){
							sUrl = sUrl.replace(/^[ ]+/g,'');
						}
						if (sUrl == "" && this.kUAdd != ""){
							this.nStart = TMPnStart;
							sUrl = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kUAdd, this.kEAdd, false));
						}
						if (sUrl != ""){
							if (this.mURL.toLowerCase().indexOf("fs.to") >= 0 ||
								this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
								this.mURL.toLowerCase().indexOf("brb.to") >= 0){
								sUrl = this.mURL + '?ajax&folder=0';
							}else{
								sUrl = this.prefixSRL + sUrl;
								sUrl= sUrl.replace(new RegExp("\\[", 'gim'), "");
							}
						}
					}
				}
				if(sUrl.toLowerCase().indexOf("moviestape.com") >= 0 && sUrl.toLowerCase().indexOf("pl=") < 0 ||
					sUrl.toLowerCase().indexOf("cvid.kiev.ua") >= 0 ||
					sUrl.toLowerCase().indexOf("50.7.212.2") >= 0 ||
					sUrl.toLowerCase().indexOf("kinoluvr.ru") >= 0 ||
					sUrl.toLowerCase().indexOf("ofx.xyz") >= 0 ||
					sUrl.toLowerCase().indexOf("kinoxa-x.ru") >= 0){
					var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
					var TMPnStart = this.nStart;
					var url = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, "pl : '", "'", false)));
					if(url==""){
						if(sUrl.toLowerCase().indexOf("ofx.xyz") >= 0){
							url = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, "file : '", ",", false)));
						}else{
							url = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, "file : '", "'", false)));
						}
					}
					this.nStart = TMPnStart;
					sUrl = url
					if(sUrl.toLowerCase().indexOf("http://") < 0){
						sUrl=prefix+sUrl;
					}					
				}else if(sUrl.toLowerCase().indexOf("animedia.tv") >= 0 ||
						sUrl.toLowerCase().indexOf("vkino.net") >= 0 ||
						sUrl.toLowerCase().indexOf("embed.china-cdn88nmbwacdnln8hq8qwe.com") >= 0 ||//uakino.net
						sUrl.toLowerCase().indexOf("go.uakino.net") >= 0 ){
					if(this.mURL.toLowerCase().indexOf("uakino.net") >= 0){
						sUrl=sUrl.replace('embed.china-cdn88nmbwacdnln8hq8qwe.com','go.uakino.net');
					}
					var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
					var TMPnStart = this.nStart;
					var url = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, '"file":"', '"', false)));
					if(url==""){
						if(sUrl.toLowerCase().indexOf("animedia.tv") >= 0){
							url = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, '<iframe src="', '"', false)));
						}
					}
					this.nStart = TMPnStart;
					sUrl=url
				}else if(sUrl.toLowerCase().indexOf("dom-film.net") >= 0){
					var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
					var TMPnStart = this.nStart;
					sUrl = decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, '" src="', '"', false)));
					this.nStart = TMPnStart;					
				}else if(sUrl.toLowerCase().indexOf("video.dewochki.net") >= 0 ||
						sUrl.toLowerCase().indexOf("stillporn.ru") >= 0){
					var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
					var TMPnStart = this.nStart;
					sUrl ="http://vk.com/video_ext.php?"+decodeURIComponent(XURL.trim(XURL.FindVal(sPage, 0, '/embed/index.php?', '"', false)));
					this.nStart = TMPnStart;
				}else if (sUrl.toLowerCase().indexOf("snastroem.ru") >= 0){
					sUrl  = XURL.GetPage(sUrl, "", "")
					TMPnStart = this.nStart;
					sUrl= XURL.trim(XURL.FindVal(sUrl, 0,'<iframe src="', '"', false))
					this.nStart = TMPnStart;
				}
				if(this.mURL.toLowerCase().indexOf("vtraxe.com") >= 0 ||
						this.mURL.toLowerCase().indexOf("zoomby.ru") >= 0 ||
						sUrl.toLowerCase().indexOf("gidtv.cc") >= 0 ||
						sUrl.toLowerCase().indexOf("aburmu4.tv") >= 0 ||
						sUrl.toLowerCase().indexOf("www.online-life.me") >= 0 ||
						sUrl.toLowerCase().indexOf("www.moviki.ru") >= 0 ||
						sUrl.toLowerCase().indexOf("tushkan.php?name=") >= 0 ||
						sUrl.toLowerCase().indexOf("rugailo.net") >= 0 && sUrl.toLowerCase().indexOf(".txt") >= 0 ||
						sUrl.toLowerCase().indexOf("kinokong.net") >= 0 && sUrl.toLowerCase().indexOf(".txt") < 0 ||
						sUrl.toLowerCase().indexOf("50.7.212.2") >= 0 && sUrl.toLowerCase().indexOf("playlist") >= 0 ||
						this.mURL.toLowerCase().indexOf("911.to") >= 0){
					var old = sUrl	
					if(old.toLowerCase().indexOf("www.online-life.me") >= 0){
						sUrl = sUrl.split("http://")[1]
						sUrl="http://"+sUrl
					}
					if(sUrl.toLowerCase().indexOf("kinokong.net") >= 0){
					}else{
						sUrl = XURL.GetPage(sUrl, "http://vk.com", "");
					}
					if(this.mURL.toLowerCase().indexOf("vtraxe.com") >= 0 ||
						this.mURL.toLowerCase().indexOf("911.to") >= 0){
						sUrl = XURL.trim(XURL.FindVal(sUrl, 0, "var flashvars = {", "};", false))
					}
					this.nStart = 0;
					while (this.nStart >= 0){
						TMPnStart = this.nStart;
						if(this.mURL.toLowerCase().indexOf("911.to") >= 0){		
							sUrl=sUrl.replace('mp4]',"mp4~");
						}
						if(this.mURL.toLowerCase().indexOf("zoomby.ru") >= 0){
							var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, '<video streamer="', "?", false));
							video_url=video_url.replace('" file="','');
							TMPnStart = this.nStart;
							sTit  = XURL.trim(XURL.FindVal(video_url, this.nStart, 'video/', "/", false))+"_"+sTit;
							this.nStart = TMPnStart;
						}else if(old.toLowerCase().indexOf("www.moviki.ru") >= 0){
							if(sUrl.toLowerCase().indexOf("$.get('") >= 0){
								TMPnStart = this.nStart;
								var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, "$.get('", "?", false));
								sUrl  = XURL.GetPage(video_url, "http://vk.com", "");
								this.nStart = TMPnStart;
							}
							video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, "video_url: '", "/'", false));
						}else if(old.toLowerCase().indexOf("rugailo.net") >= 0){
							if(sUrl.toLowerCase().indexOf("playlist") >= 0){
								sUrl = sUrl.split("flashvars")[1];
								sUrl="flashvars"+sUrl
							}
							var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, "','file':'", "'", false));	
						}else if(old.toLowerCase().indexOf("tushkan.net") >= 0){							
							var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, "'file' : '", "'", false));								
						}else if(old.toLowerCase().indexOf("aburmu4.tv") >= 0 ||
								old.toLowerCase().indexOf("www.online-life.me") >= 0){
						}else if(old.toLowerCase().indexOf("gidtv.cc") >= 0){
							var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, " or ", "'", false));
							video_url = video_url.split("/")[1]
							TMPnStart = this.nStart;
							sTit  = XURL.trim(XURL.FindVal(video_url, this.nStart, 'video/', "?", false));
							this.nStart = TMPnStart;
						}else if(this.mURL.toLowerCase().indexOf("vtraxe.com") >= 0 ||
							sUrl.toLowerCase().indexOf("kinokong.net") >= 0 ||
							this.mURL.toLowerCase().indexOf("911.to") >= 0){
							var video_url  = XURL.trim(XURL.FindVal(sUrl, this.nStart, "http://", "mp4", false));
							if(sUrl.toLowerCase().indexOf("comment") >= 0 && this.mURL.toLowerCase().indexOf("911.to") >= 0){
								TMPnStart = this.nStart;
								sTit  = XURL.trim(XURL.FindVal(sUrl, this.nStart,'comment":"', '"', false))+"_"+sTit
								this.nStart = TMPnStart;
							}
							if(video_url!=""){
								video_url  = "http://"+video_url+"mp4"
							}
						}
						if (video_url != ""){
							if (video_url != "" && video_url != prevUrl){
								sTit = XURL.trim(XURL.ReplWords(video_url, [["[^/]*/", ""]]));
								if (sTit != ""){
									sTit = unescape(sTit);
									sRes = sRes + XURL.GetPartXML(sTit, video_url, sDes, sLogo);
								}
							}else{
								XURL.error=3;
								sRes = XURL.Results_array("Видео файл не найден.", "", sDes + "<br><font color='#f40e'><b>Не найдено файлов с расширениями видео!</b></font>", 0, "", false);
							}	
						}else{
							this.nStart = -1
						}
					}
				}else if(this.mURL.toLowerCase().indexOf("ofx.to") >= 0 && sUrl.toLowerCase().indexOf("pl/") >= 0 ||
						this.mURL.toLowerCase().indexOf("animult.tv") >= 0 && sUrl.toLowerCase().indexOf('json') >= 0 ||
						sUrl.toLowerCase().indexOf("vepizode.net") >= 0 ||
						sUrl.toLowerCase().indexOf("latino-serialo.ru") >= 0 ||
						sUrl.toLowerCase().indexOf("kinoprosmotr.net") >= 0 ||
						sUrl.toLowerCase().indexOf("zagonka.ru") >= 0  && sUrl.toLowerCase().indexOf(".txt") >= 0 ||
						sUrl.toLowerCase().indexOf("kinokong.net") >= 0 && sUrl.toLowerCase().indexOf(".txt") >= 0 ||
						sUrl.toLowerCase().indexOf("kinoluvr.ru/player/pl.php?") >= 0 ||
						sUrl.toLowerCase().indexOf("moviestape.com") >= 0 && sUrl.toLowerCase().indexOf("pl=") >= 0 ||
						
						sUrl.toLowerCase().indexOf("filmodrom.net") >= 0 && sUrl.toLowerCase().indexOf(".xml") >= 0 ||
						sUrl.toLowerCase().indexOf("kinotochka.net") >= 0 && sUrl.toLowerCase().indexOf(".txt") >= 0 ||
						this.mURL.toLowerCase().indexOf("kino-live.org") >= 0 && sUrl.toLowerCase().indexOf(".txt") >= 0 ||
						sUrl.toLowerCase().indexOf("play.safesreview.com") >= 0){				
					if(sUrl.toLowerCase().indexOf("moviestape.com") >= 0){
						sUrl=sUrl.replace("show.php?","pl.php?");
					}	
					console.log(sUrl)						
					var sPage  = decodeURIComponent(XURL.GetPage(sUrl, "http://vk.com", ""));
					sPage=JSON.parse(sPage);
					for(var i=0; i < sPage.playlist.length; ++i) {
						sUrl = sPage.playlist[i].file;
						if(this.mURL.toLowerCase().indexOf("ofx.to") >= 0){
							sUrl = sUrl.split(',')[0]
							if(sUrl.toLowerCase().indexOf("http://") < 0){
								sUrl ="http://ofx.xyz"+sUrl
							}
						}
						var playlist = sPage.playlist[i].playlist;
						if(typeof playlist!="undefined"){
							for(var ii=0; ii < playlist.length; ++ii) {
								sUrl =  playlist[ii].file;
								if (sUrl != "" && sUrl != prevUrl){
									sTit = XURL.trim(XURL.ReplWords(sUrl, [["[^/]*/", ""]]));
									if (sTit != ""){
										sTit = unescape(sTit);
										sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo);
									}
								}
							}
						}else{
							if (sUrl != "" && sUrl != prevUrl){
								sTit = XURL.trim(XURL.ReplWords(sUrl, [["[^/]*/", ""]]));
								if (sTit != ""){
									if(this.mURL.toLowerCase().indexOf("ofx.to") >= 0){
										sTit = sPage.playlist[i].comment;
									}else{
										sTit = unescape(sTit);
									}
									sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo);
								}
							}else{
								XURL.error=3;
								sRes = XURL.Results_array("Видео файл не найден.", "", sDes + "<br><font color='#f40e'><b>Не найдено файлов с расширениями видео!</b></font>", 0, "", false);
							}
						}
					}
				}else{
					sUrl = XURL.GetExtURL(sUrl);
					if (sUrl != "" && sUrl != prevUrl){
						prevUrl = sUrl;
						sUrl = XURL.ReplWords(sUrl, this.arrReplWordsFrwd);
						TMPnStart = this.nStart;
						if (this.mURL.toLowerCase().indexOf("fs.to") >= 0||
							this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
							this.mURL.toLowerCase().indexOf("brb.to") >= 0){
								sTit = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBTt, this.kPETt, true));
								if (sTit == ""){
									this.nStart = TMPnStart;
									sTit = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBTt, this.kPETt, false));
								}
								if(sTit.toLowerCase().indexOf('span class="material-size">') >= 0){
									var Desc=sTit
									sTit = sTit.split('</span>')[0]
									sDes=Desc.split('}">')[1]
									sDes=sDes.replace('Список файлов','');
									sDes=sDes.replace('<b>','');
									sDes=sDes.replace('<a href="#" class="link-more m-color">','');
									sDes=sDes.replace('</span> <span class="material-size">','</br><font color="#74b9fe">Размер папки: </font>');
									sDes=sDes.replace('<span class="material-size">','</br><font color="#74b9fe">Качество: </font>');
									sDes=sDes.replace('<span class="material-details">','</br><font color="#74b9fe">Каличество файлов: </font>');
									sDes=sDes.replace('<span class="material-date">','</br><font color="#74b9fe">Дата обновления: </font>');
									sDes="<font color='#74b9fe'>Папка: </font>"+sDes
									if(typeof this.Logo_fs!="undefined"){
										sLogo=this.Logo_fs
									}
								}
	
						}else if(sUrl.toLowerCase().indexOf("moonwalk.cc") >= 0 ||
								sUrl.toLowerCase().indexOf("hdcdn.nl") >= 0){
							sUrl  = XURL.GetMoonwalk(sUrl);
							var sPage=JSON.parse(sUrl);
							sUrl = sPage.url;
							sTit = sPage.title;
						}else{
							sTit = XURL.trim(XURL.FindVal(sOut, this.nStart, this.kPBTt, this.kPETt, false));
						}
						this.nStart = TMPnStart;
						sTit = XURL.trim(XURL.ReplWords(sTit, this.arrReplWordsTitl));
						if (sTit == ""){
							sTit = XURL.trim(XURL.ReplWords(sUrl, this.arrReplWordsFile));
							if (sUrl.toLowerCase().indexOf("www.dojki.com") >= 0){
								sUrl=XURL.GetPage(sUrl, "http://vk.com", "");
							}else if (this.mURL.toLowerCase().indexOf("youporn.com") >= 0){
								console.log("youporn.com")
								sTit ="18+.mp4";
								sUrl = sUrl.replace(new RegExp("&amp;", 'gim'), '&');
								sUrl=decodeURIComponent(sUrl);
							}else if (sUrl.toLowerCase().indexOf("veterok.tv") >= 0){
								sTit = video_title_Veterok+".mp4";
							}else if (sUrl.toLowerCase().indexOf("ru-porn.tv") >= 0){
								if (sUrl.toLowerCase().indexOf("low") >= 0){
									sTit ="18+_320.mp4";
								}else if (sUrl.toLowerCase().indexOf("medium") >= 0){
									sTit ="18+_480.mp4";
								}else if (sUrl.toLowerCase().indexOf("high") >= 0){
									sTit ="18+_720.mp4";
								}
							}else if (sUrl.toLowerCase().indexOf("195.138.242.112") >= 0){//hdrezka.tv
								sTit = sUrl.split("?")[0]
							}else if (sUrl.toLowerCase().indexOf("vk.me") >= 0){
								this.vk_title= decodeURIComponent(this.vk_title)
								this.vk_title= this.vk_title.replace(/\+/g, ' ')
								sTit = this.vk_title+this.vk_format;
								if(this.vk_title==""){
									sTit = ".mp4"
								}
							}else if (sUrl.toLowerCase().indexOf("kinokong.net") >= 0){
								sTit= win2unicode(sTit);
							}else if(this.mURL.toLowerCase().indexOf("fs.to") >= 0 ||
								this.mURL.toLowerCase().indexOf("cxz.to") >= 0 ||
								this.mURL.toLowerCase().indexOf("brb.to") >= 0){
								sTit = decodeURIComponent(sTit);
								sTit=sTit.replace(/\+/g, ' ')								
							}
							if (!XURL.checkNameExt(sTit, this.arrVideoExt) && 
								!XURL.checkNameExt(sTit, this.arrAudioExt) && 
								!XURL.checkNameExt(sTit, this.arrPListExt)){
								sTit = "";
							}
						}
						if(this.mURL.toLowerCase().indexOf("ex.ua") >= 0){	
							sDes=XURL.beautiful_text(sDes,sTit)
						}
						sUrl = sUrl.replace(new RegExp("&quot;", 'gim'), '"');	
						if(sUrl.toLowerCase().indexOf("youtube_video_api") >= 0){							
							var json = JSON.parse(sUrl)
							var list = json.youtube_video_api
							for(var i=0; i < list.length; ++i) {
								sTit = unescape(YouTube_type[list[i].quality][1]+"_"+list[i].title)
								sUrl = list[i].video
								sLogo = list[i].image
								sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo)
							}
						}else if(sUrl.toLowerCase().indexOf("my_mail_api") >= 0){			
							var json = JSON.parse(sUrl)
							var list = json.my_mail_api
							for(var i=0; i < list.length; ++i) {
								sTit = list[i].title
								sUrl = list[i].video
								sLogo = list[i].jpg
								sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo)
							}
						}else if(sUrl.toLowerCase().indexOf("vimeo_api") >= 0){						
							var json = JSON.parse(sUrl)
							var list = json.vimeo_api
							for(var i=0; i < list.length; ++i) {
								sTit = list[i].title
								sTit = XURL.trim(XURL.ReplWords(sTit, this.arrReplWordsTitl));
								sTit = unescape(sTit);
								sUrl = list[i].video
								sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo)
							}	
						}else{
							if (sUrl.toLowerCase().indexOf("vk_video_api") >= 0){
								var json = JSON.parse(sUrl)
								sUrl = json.vk_video_api
								sTit = json.title+"_"+json.res+".mp4";
								sLogo=json.jpg
								sDes="Автор: "+json.author+"</br>"+"Время: "+Math.floor(json.duration/60)+" мин."	
							}
							if (sTit != ""){
								sTit = unescape(sTit);
								sRes = sRes + XURL.GetPartXML(sTit, sUrl, sDes, sLogo);
							}
						}
					}
				}
			}
		}
			if (sRes == ""){
				XURL.error=3;
				sRes = XURL.Results_array("Видео файл не найден.", "", sDes + "<br><font color='#f40e'><b>Не найдено файлов с расширениями видео!</b></font>", 0, "", false);
			}		
		}
	}else{
		XURL.error=4;
		sRes = XURL.Results_array("Ошибка сервера.", "", "<font color='#f40'><b>Не правильный ответ сервера: " + this.xmlHTTP.status + "!</b></font>", 0, "", false);
	}
	if(this.MODE_parser=="2_0"){
		XURL.Finish_2_0();
	}else{
		XURL.Finish_array();
	}
}

XURL.GetPartXML = function (sTit, sUrl, sDes, sLogo){

	if (XURL.checkNameExt(sTit, this.arrVideoExt) || 
		XURL.checkNameExt(sUrl, this.arrVideoExt) || 
		XURL.checkNameExt(sTit, this.arrAudioExt) || 
		XURL.checkNameExt(sUrl, this.arrAudioExt) ||		
		sUrl.toLowerCase().indexOf("vkontakte") >= 0 || 
		sUrl.toLowerCase().indexOf("vk.com") >= 0){
		return XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, true);

	}else if (!XURL.checkNameExt(sTit, this.arrImageExt) && 
		!XURL.checkNameExt(sUrl, this.arrImageExt) && 
		!XURL.checkNameExt(sTit, this.arrTrashExt) && 
		!XURL.checkNameExt(sUrl, this.arrTrashExt)){
		return XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, false);
	}
}

XURL.GetExtURL = function (sUrl){
	if (sUrl != "" && (sUrl.toLowerCase().indexOf("vkontakte") >= 0 || 
		sUrl.toLowerCase().indexOf("vk.com") >= 0)){
		sUrl = sUrl.replace(new RegExp(" ", 'gim'), "");
		sUrl = sUrl.replace(new RegExp("&amp;", 'gim'), "&");		
		if (this.redirVK){
			sUrl = XURL.GetVKurl(sUrl);
		}
	}
	if (sUrl.toLowerCase().indexOf("s1.onlinefilmx.ru") >= 0 ||
		sUrl.toLowerCase().indexOf("s2.onlinefilmx.ru") >= 0 ||
		sUrl.toLowerCase().indexOf("s3.onlinefilmx.ru") >= 0){
			sUrl = sUrl.replace(new RegExp("360", 'gim'), "");
			sUrl = sUrl.replace(new RegExp(",", 'gim'), "");
			sUrl = sUrl.replace(new RegExp("480", 'gim'), "");
			sUrl = sUrl.replace(new RegExp("\\[", 'gim'), "");
			sUrl = sUrl.replace(new RegExp("\\]", 'gim'), "");
	}
	if (sUrl.toLowerCase().indexOf("veterok.tv") >= 0){
		sUrl = XURL.getVeterokURL(sUrl);
	}
	if (sUrl.toLowerCase().indexOf("youtube.com") >= 0){
		sUrl = YouTube_parse(sUrl);		
	}
	if (sUrl.toLowerCase().indexOf("videoapi.my.mail.ru") >= 0){
		sUrl = XURL.MyMail(sUrl);	
	}
	if (sUrl.toLowerCase().indexOf("vimeo.com") >= 0){
		sUrl = XURL.Vimeo(sUrl);	
	}
	return sUrl;
}

XURL.Vimeo = function (sUrl){
	//https://vimeo.com/moogaloop.swf?clip_id=83374684
	//https://player.vimeo.com/video/14803194?autoplay=1
	//https://vimeo.com/14803194
	if(sUrl.toLowerCase().indexOf("clip_id=") >= 0){							
		sUrl = sUrl.split("clip_id=")[1];
		sUrl ="https://player.vimeo.com/video/"+sUrl		
	}else if(sUrl.toLowerCase().indexOf("/video/") < 0){
		sUrl = sUrl.split(".com/")[1];
		sUrl ="https://player.vimeo.com/video/"+sUrl
	}
	var result='{"vimeo_api":[';
	var sPage  = XURL.GetPage(sUrl, "", "");
	var TMPnStart = this.nStart;
	var title   = XURL.trim(XURL.FindVal(sPage, 0, "<title>", '</title>', false));
	this.nStart = TMPnStart;
	this.nStart = 0;
	while (this.nStart >= 0){
		var video  = XURL.trim(XURL.FindVal(sPage, this.nStart, 'url":"', '"', false));
		var width  = XURL.trim(XURL.FindVal(sPage, this.nStart, 'width":', ',', false));
		if (video != ""){
			if(video.toLowerCase().indexOf(".mp4") >= 0){
				result+='{"video":"'+video+'","title":"'+width+"_"+title+'.mp4"},'
			}
		}else{
			this.nStart = -1
		}
	}
	result+="]}"
	result=result.replace('},]}', '}]}');
	console.log(result)
	return result;
}

XURL.MyMail = function (sUrl){
	sUrl=sUrl.replace("embed/","");
	sUrl=sUrl.replace(".html",".json");
	var sPage  = XURL.GetPage(sUrl, "", "");
	var result='{"my_mail_api":[';
	if(sPage.toLowerCase().indexOf('videos') >= 0){						
		sPage=JSON.parse(sPage);							
		var title=sPage.meta.title;
		var sLogo=sPage.meta.poster;
		var videos=sPage.videos;
		for(var i=0; i < videos.length; ++i) {
			var sUrl=videos[i].url
			var sTit=videos[i].key+"_"+title+".mp4"
			result+='{"video":"'+sUrl+'","title":"'+sTit+'","jpg":"'+sLogo+'"},'
		}
	}
	result+="]}"
	result=result.replace('},]}', '}]}');
	return result;
}

XURL.getVeterokURL = function (sUrl){
	var sPage  = XURL.GetPage(sUrl, "", "");
	var TMPnStart = this.nStart;
	var video_url   = XURL.trim(XURL.FindVal(sPage, 0, "<script>files", '";</script>', false));
	video_url = video_url.split('="')[1]
	video_title_Veterok = XURL.trim(XURL.FindVal(sPage, 0, '<span id="fm-video_title">', '</span>', false));
	this.nStart = TMPnStart;
	return video_url;
}

XURL.GetMoonwalk = function (sUrl){
	if(sUrl.toLowerCase().indexOf("moonwalk.cc") >= 0){
		var url="http://moonwalk.cc/sessions/create_session"
	}else if(sUrl.toLowerCase().indexOf("hdcdn.nl") >= 0){
		var url="http://hdcdn.nl/sessions/create_session"
	}
	//запоминаем глобальное положение поиска для основной страницы
	var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
	var TMPnStart = this.nStart;
	//ищем необходимые параметры
	var showVideo = XURL.trim(XURL.FindVal(sPage, 0, "function showVideo()", "'player'", false));
	var partner = XURL.trim(XURL.FindVal(showVideo, 0, "partner:", ",", false));
	var d_id = XURL.trim(XURL.FindVal(showVideo, 0, "d_id:", ",", false));
	var video_token = XURL.trim(XURL.FindVal(showVideo, 0, "video_token: '", "'", false));
	var content_type = XURL.trim(XURL.FindVal(showVideo, 0, "content_type: '", "'", false));
	var access_key = XURL.trim(XURL.FindVal(showVideo, 0, "access_key: '", "'", false));
	var title = XURL.trim(XURL.FindVal(showVideo, 0, "player_osmf('", "'", false));
	var video_url="partner="+partner+"&d_id="+d_id+"&video_token="+video_token+"&content_type="+content_type+"&access_key="+access_key;	
	var manifest_m3u8=XURL.GetPage(url,"http://vk.com",video_url);
	var m3u8 = XURL.trim(XURL.FindVal(manifest_m3u8, 0, 'manifest_m3u8":"', '"', false));
	var result='{"url":"'+m3u8+'","title":"'+title+'"}'	
	//возвращаем глобальное положение поиска для основной страницы (поскольку здесь при поиске мы его сбили)
	this.nStart = TMPnStart;
	
    return result;		
}

//раскручиваем ссылку "вконтакте" до конечной
XURL.GetVKurl = function(sUrl){
	//https://api.vk.com/method/video.getEmbed?oid=264700616&video_id=171133962&embed_hash=9e54378e2536a764
	//http://vk.com/video_ext.php?oid=-45286117&id=166556199&hash=6c963cc53eabd605		
	var oid = sUrl.split('oid=')[1]
	var id = sUrl.split('&id=')[1]
	var hash = sUrl.split('hash=')[1]
	oid = oid.substr(0, oid.indexOf('&'));
	id = id.substr(0, id.indexOf('&'));
	if (hash.toLowerCase().indexOf("&hd") >= 0){
		hash = hash.substr(0, hash.indexOf('&'));
	}
	sUrl="https://api.vk.com/method/video.getEmbed?oid="+oid+"&video_id="+id+"&embed_hash="+hash;
	console.log("vk="+sUrl);
	//return sUrl;
	//получаем конечную страницу
	var sPage  = XURL.GetPage(sUrl, "http://vk.com", "");
	//собираем конечную ссылку
	//var SubUrl = XURL.GetVKSubUrl(sPage);
	var SubUrl = XURL.GetVKapiUrl(sPage,sUrl);
	//возвращаем конечную ссылку
	//{"vk_video_api":"http://cs543303v6.vk.me/u296393115/videos/9c6c01b86a.480.mp4?extra=5jCaxk7j…w0GX0yR-56ftdQCZIY-w58VmajgdXkUJMTgdiVhab5tpdiSWxzAT-ucqaFyDVJECDyEr9V5IXA","title":"Пылающие мертвецы / The Burning Dead (Рене Перез / Rene Perez) [2015 г]","author":"Новинки кинематографа","jpg":"http://cs543303.vk.me/u296393115/video/x_c4053096.jpg","duration":"4941","res":"480"}
	console.log("SubUrl");
	console.log(SubUrl);
	return SubUrl;
}

XURL.GetVKapiUrl = function(sPage,sUrl){
	var json=JSON.parse(sPage);
	var video="";
	var res="";
	var result="";
	if(sPage.toLowerCase().indexOf("url720") >= 0){
		video=json.response.url720
		res="720"
	}else if(sPage.toLowerCase().indexOf("url480") >= 0){
		video=json.response.url480
		res="480"
	}else if(sPage.toLowerCase().indexOf("url360") >= 0){
		video=json.response.url360
		res="360"
	}else if(sPage.toLowerCase().indexOf("url240") >= 0){
		video=json.response.url240
		res="240"
	}
	if(video!=""){
		var title=decodeURIComponent(json.response.md_title).replace(new RegExp('"', 'gim'), "'");
		var author=decodeURIComponent(json.response.md_author).replace(new RegExp('"', 'gim'), "'");
		var jpg=json.response.jpg
		var duration=json.response.duration
		result='{"vk_video_api":"'+sUrl+'","title":"'+title+'","author":"'+author+'","jpg":"'+jpg+'","duration":"'+duration+'","res":"'+res+'"}'
	}
   return result;
}
//компонуем ссылку из данных на странице
XURL.GetVKSubUrl = function(sPage){
	//запоминаем глобальное положение поиска для основной страницы
	var TMPnStart = this.nStart;
	this.vk_format_name='';//ищем необходимые параметры
	var video_host   = XURL.trim(XURL.FindVal(sPage, 0, "var video_host = \'", "\'", false));
	var video_uid    = XURL.trim(XURL.FindVal(sPage, 0, "var video_uid = \'", "\'", false));
	var video_vtag   = XURL.trim(XURL.FindVal(sPage, 0, "var video_vtag = \'", "\'", false));
	var video_no_flv = XURL.trim(XURL.FindVal(sPage, 0, "video_no_flv =", ";", false));
	var video_max_hd = XURL.trim(XURL.FindVal(sPage, 0, "var video_max_hd = \'", "\'", false));
	var video_title = XURL.trim(XURL.FindVal(sPage, 0, "var video_title = \'", "\'", false));
	if(video_title==""){
		this.vk_title="";
	}else{
		this.vk_title=video_title;
	}
	if (video_max_hd > "3"){
		video_max_hd = "3";
	}
	var result = "";//по умолчанию - минимальное разрешение
	var fname = "240.mp4";//определяем имя конечного файла с максимальным разрешением
    switch (video_max_hd) {
        case "0": fname = "240"; break;
        case "1": fname = "360"; break;
        case "2": fname = "480"; break;
        case "3": fname = "720"; break;
    }
	this.vk_format=" ("+fname+").mp4";	//собираем ссылку, если есть все данные
    if (video_host!="" && video_uid!="" && video_vtag!=""){
        result = video_host + "u" + video_uid + "/videos/" + video_vtag + "." + fname+".mp4";
		this.vk_title = video_vtag + "." + fname+".mp4"
    }
		//возвращаем глобальное положение поиска для основной страницы (поскольку здесь при поиске мы его сбили)
	this.nStart = TMPnStart;
		//возвращаем полученную ссылку
	return result;
}

XURL.GetUSBMedia = function (sURL2){
	var sUrl, sTit, sDes, sLogo, sURL3;
	var sRes = "";
	var sURL4 = false;
	var sURL5 = XURL.trim(sURL2);
	var sURL6 = new FileSystem();
	//var StoragePlugin = document.getElementById('pluginStorage');
    //var DeviceId = StoragePlugin.GetUSBDeviceID(0); 
    //var usb_mount_path = StoragePlugin.GetUSBMountPath(DeviceId, 0);       
   // var usbPath = '/dtv/usb/' + usb_mount_path;
	if (sURL5.toLowerCase() == XURL.trim(this.keyUSB.toLowerCase())){
		sURL5 = this.mntUSB;
		for (var i = 0; i < this.arrUSB.length; ++i){
			if (sURL5.charAt(sURL5.length - 1) != "/"){
				sURL5 = sURL5 + "/";
			}
			sURL3 = sURL6.readDir(sURL5 + this.arrUSB[i]);
			console.log(sURL5 + this.arrUSB[i])
			if (sURL3){
				sURL5 = sURL5 + this.arrUSB[i];
				sURL4 = true;
				break;
			}else{
				if(sURL5!="/usb/"){
					if(i == this.arrUSB.length-1){
						i=0;
						sURL5=this.mntUSB2;
					}
				}
			}
		}
	}else{
		sURL5 = sURL5.replace(new RegExp(this.keyUSB, "i"), this.mntUSB);
		sURL4 = true;
	}
	if (sRes == "" && sURL4){
		sURL3 = sURL6.readDir(sURL5);
		if (sURL3){
			sURL3 = XURL.SortFiles(sURL3);
			sURL3 = XURL.DelDoubleFiles(sURL3);
			if (sURL5.charAt(sURL5.length - 1) != "/"){
				sURL5 = sURL5 + "/";
			}
			this.title = this.title + " (" + sURL5 + ")";
			for (var i = 0; i < sURL3.length; i++){
				if (sURL3[i].isDir){
					sUrl = XURL.trim(sURL3[i].name);
					sTit = sUrl.toUpperCase();
					sDes = 'каталог: <font color="lightgreen">' + sUrl.toUpperCase() + '</font>';
					if (sUrl != "." && sUrl != ".."){
						sDes = sDes + "<br/>создан: <i>" + sURL3[i].mtime + "</i>";
					}
					sLogo = this.icoFolder;
					if (sUrl != "." && sUrl != ".."){
						sUrl = sURL5.replace(new RegExp(this.mntUSB, "i"), this.keyUSB) + sUrl;
						sRes = XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, false);
					}
				}
			}
			for (var i = 0; i < sURL3.length; i++){
				if (!sURL3[i].isDir){
					sUrl = XURL.trim(sURL3[i].name);
					if (XURL.checkNameExt(sUrl, this.arrPListExt)){
						sTit = sUrl;
						if (XURL.checkNameExt(sUrl, ".m3u")){
							this.rssTypeList = "m3u";
						}else if (XURL.checkNameExt(sUrl, ".xml")){
							this.rssTypeList = "xml";
						}else{
							this.rssTypeList = "parser_usb";
						}
						sDes = "Файл: <font color='pink'>" + sUrl + "</font>" + "<br/>размер: <b>" + XURL.DynamicSize(sURL3[i].size) + "</b>" + "<br/>создан: <i>" + sURL3[i].mtime + "</i>";
						sLogo = this.icoFolder;
						sUrl = sURL5 + sUrl;
						sRes = XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, false);						
					}
				}
			}
			for (var i = 0; i < sURL3.length; i++){
				if (!sURL3[i].isDir){
					sUrl = XURL.trim(sURL3[i].name);
					if (XURL.checkNameExt(sUrl, this.arrVideoExt) || 
						XURL.checkNameExt(sUrl, this.arrAudioExt) || 
						XURL.checkNameExt(sUrl, this.arrImageExt)){
						sTit = sUrl;
						sDes = "Файл: <font color='cyan'>" + sUrl + "</font>" + "<br/>размер: <b>" + XURL.DynamicSize(sURL3[i].size) + "</b>" + "<br/>создан: <i>" + sURL3[i].mtime + "</i>";
						sLogo = this.icoMedia;
						sUrl = sURL5 + sUrl;
						sRes = XURL.Results_array(sTit, sUrl, sDes, 0, sLogo, true);
					}
				}
			}
			if (sRes == ""){
				XURL.error=5;
				sRes = XURL.Results_array('Каталог пуст', '', 'Каталог: <font color="lightgreen">' + sURL5 + '</font><br/> не содержит данных!', 0, this.icoFolder, false);
			}
		}
	}else{
		if (sRes == ""){
			XURL.error=6;
			sRes = XURL.Results_array("USB-drive отсутствует или пуст", "", "<font color='#f40'><b>USB-drive не найден или, не содержит данных!</b></font>", 0, this.icoUSB, false);				
			this.title = this.title + " (" + XURL.trim(sURL2) + ") ";
		}
	}
	if(this.MODE_parser=="2_0"){
		XURL.Finish_2_0();
	}else{
		XURL.Finish_array();
	}
	//return sRes;
}

XURL.DynamicSize = function (sURLa){
	var sURLb = "";
	if (sURLa < 0){
		sURLb = ">1.5 Гб";
	}else if (sURLa >= 0 && sURLa <= 1024){
		sURLb = sURLa + " Байта";
	}else if (sURLa > 1024 && sURLa <= 1048576){
		sURLb = Math.round((sURLa / 1024) * 100) / 100 + " Кб";
	}else if (sURLa > 1048576 && sURLa <= 1073741824){
		sURLb = Math.round((sURLa / 1048576) * 100) / 100 + " Мб";
	}else if (sURLa > 1073741824){
		sURLb = Math.round((sURLa / 1073741824) * 100) / 100 + " Гб";
	}			
	return sURLb;
}

XURL.SortFiles = function (sURL3){
	var sURL9;
	var sURLa = false;
	for (var i = 1; i < sURL3.length; i++){
		if (XURL.trim(sURL3[i - 1].name) > XURL.trim(sURL3[i].name)){
			sURL9 = sURL3[i];
			sURL3[i] = sURL3[i - 1];
			sURL3[i - 1] = sURL9;
			sURLa = true;
		}
	}
	if (sURLa){
		sURL3 = XURL.SortFiles(sURL3);
	}
	return sURL3;
}

XURL.DelDoubleFiles = function (sURL3){
	var sURLb = new Array();
	for (var i = 1; i < sURL3.length; i++){
		if (XURL.trim(sURL3[i - 1].name) != XURL.trim(sURL3[i].name)){
			sURLb.push(sURL3[i - 1]);
		}
	}
	sURLb.push(sURL3[sURL3.length - 1]);
	return sURLb;
}

//поиск значения на странице и вычленение его
XURL.FindVal = function(sOut, nBeg, keyBVal, keyEVal, bLast){
//
	var nEnd, sRes;
    //приводим к нижнему регистру
    sRes = sOut.toLowerCase();
    //ищем строчку значения (с начала или с конца строки)
    if (bLast){
       nBeg = sRes.lastIndexOf(keyBVal.toLowerCase(), nBeg);
    }else{
       nBeg = sRes.indexOf(keyBVal.toLowerCase(), nBeg);
    }
    //если значение найдено
    if (nBeg >= 0){
       //передвигаем начало поиска на след. символ за первичным ключом
       nBeg = nBeg + keyBVal.length;
       //ищем вторичный ключ
       nEnd = sRes.indexOf(keyEVal.toLowerCase(), nBeg);
       //если не нашли окончание значения - становимся в конец строки +1 символ
       if (nEnd < 0){ 
          nEnd = sRes.length;
          //возвращаем положение глобального поиска на конец строки
          this.nStart = nEnd
       }else{
          //возвращаем положение глобального поиска на след. символ за вторичным ключом
          this.nStart = nEnd + keyEVal.length;
       }
       //вычленяем значение
       sRes = sOut.substring(nBeg, nEnd);
    }else{
       //не найден первичный ключ
       sRes = "";
       //конец поиска - маска не найдена
       this.nStart = nBeg;
    }
	//
    return sRes;
}

//удаление "мусора" из строки
XURL.DelTrash = function(str){
    //заменяем мусор на пробелы
    str = str.replace(new RegExp("&nbsp;", 'gim'), " ");
    str = str.replace(new RegExp("&mdash;", 'gim'), " ");
    str = str.replace(new RegExp("\t", 'gim'), " "); //табуляция
    str = str.replace(new RegExp("\n", 'gim'), " "); //конец строки
    str = str.replace(new RegExp("\r", 'gim'), " "); //перевод каретки

    //заменяем все "длинные" пробелы на один
    while (str.indexOf("  ") >= 0){
      str = str.replace(new RegExp("  ", 'gim'), " ");
    }
    return XURL.trim(str);
}

//удаление исключенных слов из результата
XURL.DelWords = function(sVal){
	var aWRL, sRes;
    sRes = sVal;
    //удаляем из входной строки все встречающиеся в массиве исключений слова
    for (var i in this.arrDelWords){
       //слово из массива
       aWRL = this.arrDelWords[i];
       sRes = sRes.replace(new RegExp(aWRL, 'gim'), "");
    }   
    //возвращаем результат
    return sRes;
}

//замена слов в результате по массиву замен
XURL.ReplWords = function(sVal, arrRepl){
var aWRL = null;
var Res = null;

    Res = sVal;
    //идем по внешнему массиву и выдергиваем слова поиска
    for (var i in arrRepl){
       //искомое слово из массива - первый элемент массива
       aWRL = arrRepl[i][0];
       //заменяем в выходной строке искомое слово на нужный вариант из справочника - второй элемент массива
       Res = Res.replace(new RegExp(aWRL, 'gim'), arrRepl[i][1]);
    }
    var rWRL = "";
	do{
		rWRL = Res;
		Res = Res.replace(new RegExp("\s*<\s*/*\s*br[^>]*>\s*<\s*/*\s*br[^>]*>", 'gim'), "<br>");
	} while (Res != rWRL);
	return Res;
}

XURL.checkNameExt = function (sName, bName){
	var aWRL;
	for (var i in bName){
		aWRL = bName[i];
		if (sName.toLowerCase().lastIndexOf(aWRL.toLowerCase()) == sName.length - aWRL.length && sName.length >= aWRL.length){
			return true;
		}
	}
	return false;
}

XURL.trim = function(str){
	if(str=="" || typeof str=="undefined"){
		return str
	}	
	while (str.charAt(str.length-1)==" "){
		str = str.substring(0,str.length-1);
	}
	while (str.charAt(0)==" "){
		str=str.substring(1);
	}
	return str;
}

//скачиваем страницу и возвращаем, как строку
XURL.GetPage = function (sUrl, sHost, aHost){
	//if(sUrl.indexOf("api.vk.com")==-1) 
	sUrl="http://xs.lnka.ru/xhr.php?u="+encodeURIComponent(sUrl);
	console.log("getpage="+sUrl);
	var sPage = "";
	var NewUrl = "";
	//инициализируем связь с интернетом
	if (this.xmlHTTP != null) {
      this.xmlHTTP = null;
   }
   this.xmlHTTP=CreateXmlHttp();
   //отсылаем пустой запрос и ловим страницу в строку
	if (aHost == ""){
		XURL.setRequestUrl("GET", sUrl, false);
	}else{
		XURL.setRequestUrl("POST", sUrl, false);
	}
	this.xmlHTTP.onreadystatechange = function (){
		if (XURL.xmlHTTP.readyState == 4){
			if (XURL.xmlHTTP.status == 200){
				sPage = XURL.xmlHTTP.responseText;
			}
		}
	}
	if (aHost == ""){		
		if(sUrl.toLowerCase().indexOf("911.to") >= 0){
		}
		this.xmlHTTP.send();
	}else{
		if(sUrl.toLowerCase().indexOf("moonwalk.cc") >= 0 ||
		   sUrl.toLowerCase().indexOf("hdcdn.nl") >= 0){		
		}else{
		}
		this.xmlHTTP.send(aHost);
	}
	if (this.xmlHTTP.status == 301 || 
		this.xmlHTTP.status == 302 || 
		this.xmlHTTP.status == 303 || 
		this.xmlHTTP.status == 307){
		if (XURL.xmlHTTP.getResponseHeader("Location") != null){
			NewUrl = XURL.trim(XURL.xmlHTTP.getResponseHeader("Location"));
			if (NewUrl.toLowerCase().substr(0, 4) != "http"){
				if (NewUrl.charAt(0) != "/"){
					NewUrl = sHost + "/" + NewUrl;
				}else{
					NewUrl = sHost + NewUrl;
				}
			}
			sPage = XURL.GetPage(NewUrl, sHost, aHost);
		}
	}
	return sPage;
}

var trans=[];
var snart=[];
for(var i=0x410;i<=0x44F;i++){
	trans[i]=i-0x350;
	snart[i-0x350] = i;
}

trans[0x401]= 0xA8;
trans[0x451]= 0xB8;
snart[0xA8] = 0x401;
snart[0xB8] = 0x451;

CP1251urlencode = function(str){
	var ret=[];
	for(var i=0;i<str.length;i++){
		var n=str.charCodeAt(i);
		if(typeof trans[n]!='undefined')
		n = trans[n];
		if (n <= 0xFF)
		ret.push(n);
	}
	return escape(String.fromCharCode.apply(null,ret));
}

function CreateXmlHttp(){
	try{
		return new ActiveXObject("Msxml2.XMLHTTP");
	}catch (e){
		try{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}catch (ee) {};
	}
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	return null;
}
 
function Utf2Win(str){
	var trans = [];
	for (var i = 0x410; i <= 0x44F; i++)
	trans[i] = i - 0x350;
	
	trans[0x401] = 0xA8;
	trans[0x451] = 0xB8;
	
	var ret = [];
	for (var i = 0; i < str.length; i++){
		var n = str.charCodeAt(i);
		if (typeof trans[n] != "undefined")
		n = trans[n];
		if (n <= 0xFF)
		ret.push(n);
	}
	return String.fromCharCode.apply(null, ret);
} 

XURL.setRequestUrl = function (sru, sUrl, sru1){

	if (XURL.trim(this.phpGate) != ""){
		sUrl = XURL.trim(this.phpGate) + "?url=" + sUrl;
	}
	this.xmlHTTP.open(sru, sUrl, sru1);
}

function CreateXmlHttp(){
	try{
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e){
		try{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (ee)
		{};
	}
	if (typeof XMLHttpRequest != "undefined"){
		return new XMLHttpRequest();
	}
	return null;
}

XURL.Result_next_p = function(sTit, sUrl, sDes, nCat, sLogo, fStream){//NEXT PAGE

	sLogo = XURL.trim(sLogo);
	if (XURL.trim(sDes) == ""){
		sDes = sTit;
	}
	var app_array;
	app_array=this.rssTypeList
	sUrl = sUrl.replace(new RegExp("&amp;", 'gim'), "&");
	var Results;
	var XURL_array_np;
	XURL_array_np=new XURL_next();
	XURL_array_np.title = sTit;
	XURL_array_np.text = sDes;
	XURL_array_np.block = "";
	XURL_array_np.epg_id= "";
	XURL_array_np.img = sLogo;
	XURL_array_np.video = sUrl;
	XURL_array_np.xml = sUrl;
	XURL_array_np.ico = sLogo;
	XURL_array_np.app = app_array;
	XURLdata_next.push(XURL_array_np);
	if(sUrl!=""){
		Results="good";
	}else{
		Results="";
	}
	return Results;
}

XURL.Results_array = function(sTit, sUrl, sDes, nCat, sLogo, fStream){//Основной контент
	var app_array;
	var mode_array;
	var block_array;
	var ico_array;
	var Results;
	sLogo = XURL.trim(sLogo);
	if (XURL.trim(sDes) == ""){
		sDes = sTit;
	}
	if (this.title == "18+"){		
		mode_array="xxx";
	}
	if (fStream){
		app_array="play";
	}else{
		app_array=this.rssTypeList;
	}
	if (sLogo != ""){
		block_array="on";
		ico_array=sLogo;
	}else{
		block_array=""
		if(app_array=="play"){
			ico_array = this.icoMedia;
		}else{
			ico_array = this.icoFolder;
		}
	}
	if (this.mURL.toLowerCase().indexOf("radiopotok.ru") >= 0){
		sUrl = sUrl.split('http')[1];
		sUrl = 'http'+sUrl;
		app_array="play";
		ico_array = this.icoMedia;
	}
	var XURL_array;
	XURL_array=new XURLc();
	XURL_array.title = sTit;
	XURL_array.text = sDes;
	XURL_array.block = block_array;
	XURL_array.epg_id= "";
	XURL_array.img = sLogo;
	XURL_array.video = sUrl;
	XURL_array.xml = sUrl;
	XURL_array.mode = mode_array;
	XURL_array.ico = ico_array;
	XURL_array.app = app_array;
	XURLdata.push(XURL_array);
	if(sUrl!=""){
		Results="good";
	}else{
		Results="";
	}
	return Results;
}

XURL.Finish_array = function(){
	nodeArray = new Array();
	setTitle(XURL.ReplWords(this.title, this.arrReplWordsFrwd))
	for(var i=0; i < XURLdata_next.length; ++i) {//NEXT PAGE
		node=new rssNode();
		node.title = XURLdata_next[i].title;
		node.text= XURLdata_next[i].text;
		node.block =XURLdata_next[i].block;
		node.epg_id=XURLdata_next[i].epg_id;
		node.video=XURLdata_next[i].video;
		node.img= XURLdata_next[i].img;
		node.xml=XURLdata_next[i].xml;
		node.mode=XURLdata_next[i].mode;
		node.ico= XURLdata_next[i].ico;
		node.app = XURLdata_next[i].app;
		nodeArray.push(node);
	}
	for(var i=0; i < XURLdata.length; ++i) {//Основной контент
		node=new rssNode();
		node.title = XURLdata[i].title;
		node.text= XURLdata[i].text;
		node.block =XURLdata[i].block;
		node.epg_id=XURLdata[i].epg_id;
		node.video=XURLdata[i].video;
		node.img= XURLdata[i].img;
		node.xml=XURLdata[i].xml;
		node.mode=XURLdata[i].mode;
		node.ico= XURLdata[i].ico;
		node.app = XURLdata[i].app;
		nodeArray.push(node);
	}
	for(var i=0; i < XURLdata_next.length; ++i) {//NEXT PAGE
		node=new rssNode();
		node.title = XURLdata_next[i].title;
		node.text= XURLdata_next[i].text;
		node.block =XURLdata_next[i].block;
		node.epg_id=XURLdata_next[i].epg_id;
		node.video=XURLdata_next[i].video;
		node.img= XURLdata_next[i].img;
		node.xml=XURLdata_next[i].xml;
		node.ico= XURLdata_next[i].ico;
		node.mode=XURLdata_next[i].mode;
		node.app = XURLdata_next[i].app;
		nodeArray.push(node);
	}
	showTitles(retNode.title_index);
	showNode(retNode.title_index+retNode.frame_index);
	Loading.hide();
}

XURL.Finish_2_0 = function(){
	if(XURL.error>0){
		XURL.MSG_ERROR();
	}else{
		var color=randomInt(0,3)
		nodeArray = new Array();
		//setTitle(XURL.ReplWords(this.title, this.arrReplWordsFrwd))
		if(indexReturn!="return"){
			var mmooddee=MODE
		}else{
			var mmooddee=retNode.mode
			if(mmooddee==""){
				var mmooddee=MODE
			}
		}
		if(mmooddee=="PORTAL_MENU"){
			if(Setting.view==0 || Setting.view==1){
				mmooddee="catalog"
			}else if(Setting.view==2){
				mmooddee="block"
			}
		}
		if(mmooddee=="catalog" || mmooddee=="block" && Setting.block_next_icon_pos==1){
			for(var i=0; i < XURLdata_next.length; ++i) {//NEXT PAGE
				node=new rssNode();
				node.title = XURLdata_next[i].title;
				node.desc= XURLdata_next[i].text;
				if(MODE=="catalog"){
					node.img= "http://dev.xsmart.tv/widget_2_0_black/app/images/folder/next.png";
				}else{
					node.img= "http://dev.xsmart.tv/widget_2_0_black/app/images/folder/next_big.png";
				}
				node.url=XURLdata_next[i].xml;
				node.mode = "page"
				node.app = XURLdata_next[i].app;
				nodeArray.push(node);
			}
		}
		var mode
		for(var i=0; i < XURLdata.length; ++i) {//Основной контент
			node=new rssNode();
			node.title = XURLdata[i].title;
			node.desc= XURLdata[i].text;
			node.video=XURLdata[i].video;
			node.img = XURLdata[i].img;
			if(XURLdata[i].mode=="" || typeof XURLdata[i].mode=="undefined"){
				var mode = "parser"
			}else{
				var mode = XURLdata[i].mode
			}
			node.mode = mode;
			node.url=XURLdata[i].xml;
			node.app = XURLdata[i].app;
			nodeArray.push(node);
			if(XURLdata[i].app=="play"){
				mode="play"
			}
		}
		if(mmooddee=="catalog" || mmooddee=="block" && Setting.block_next_icon_pos==0){
			for(var i=0; i < XURLdata_next.length; ++i) {//NEXT PAGE
				node=new rssNode();
				node.title = XURLdata_next[i].title;
				node.desc= XURLdata_next[i].text;
				if(MODE=="catalog"){
					node.img= "http://dev.xsmart.tv/widget_2_0_black/app/images/folder/next.png";
				}else{
					node.img= "http://dev.xsmart.tv/widget_2_0_black/app/images/folder/next_big.png";
				}
				node.url=XURLdata_next[i].xml;
				node.mode = "page"
				node.app = XURLdata_next[i].app;
				nodeArray.push(node);
			}
		}
		for(var i=0; i < XURLdata_next.length; ++i) {
			this.next_page_url=XURLdata_next[i].xml;
			this.next_page_app=XURLdata_next[i].app;
		}
		//showTitles(retNode.title_index);
		//showNode(retNode.title_index+retNode.frame_index);
		//Loading.hide();
		
		//if(retNode.mode != "lists"){
		if(Setting.view==0 || Setting.view==2){
			if (mode=="play"){
				Lists.init();
			}else{
				Blocks.init();
			}
		}else if(Setting.view==1){
			Catalog.init();
		}
	}	
}

function parseQuery(query){
    var k = {};
    var re = /[?&]?([^=]+)(?:=([^&]*))?/g;
    while(m = re.exec(query)){
      if(m[1] && m[2])
        k[m[1]] = decodeURIComponent(m[2]);
      else if(m[1])
        k[m[1]] = '';
    }
    return k;
}


function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function win2unicode(str) {
   var charmap   = unescape(
      "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
      "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
      "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
      "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
   var code2char = function(code) {
               if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
               if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
               return String.fromCharCode(code)
            }
   var res = ""
   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
   return res
}
XURL.beautiful_text = function (str,sTit){
	str=str.replace(/<\/?[^>]+>/g, "");

	if(this.mURL.toLowerCase().indexOf("ex.ua") >= 0){
		str=str.replace(sTit,'<font color="#74b9fe"></br>Автор релиза: </font>');
		str=str.replace(',','<font color="#74b9fe"></br>Дата релиза: </font>');
	}
	str=str.replace('Название:','<font color="#74b9fe"></br>Название:</font>');
	str=str.replace('Оригинальное название:','<font color="#74b9fe"></br>Оригинальное название:</font>');
	str=str.replace('Русское название:','<font color="#74b9fe"></br>Русское название:</font>');
	str=str.replace('Жанр:','<font color="#74b9fe"></br>Жанр:</font>');
	str=str.replace('жанр:','<font color="#74b9fe"></br>жанр:</font>');
	str=str.replace('Жанры:','<font color="#74b9fe"></br>Жанры:</font>');
	str=str.replace('Выпущено:','<font color="#74b9fe"></br>Выпущено:</font>');
	str=str.replace('Рип:','<font color="#74b9fe"></br>Рип:</font>');
	str=str.replace('Русскоязычное название:','<font color="#74b9fe"></br>Русскоязычное название:</font>');
	str=str.replace('Производство:','<font color="#74b9fe"></br>Производство:</font>');
	str=str.replace('Статус:','<font color="#74b9fe"></br>Статус:</font>');
	str=str.replace('Год выхода:','<font color="#74b9fe"></br>Год выхода:</font>');
	str=str.replace('Год выпуска:','<font color="#74b9fe"></br>Год выпуска:</font>');
	str=str.replace('Редактор:','<font color="#74b9fe"></br>Редактор:</font>');
	str=str.replace('Год:','<font color="#74b9fe"></br>Год:</font>');
	str=str.replace('год:','<font color="#74b9fe"></br>год:</font>');
	str=str.replace('Режисcер:','<font color="#74b9fe"></br>Режисcер:</font>');
	str=str.replace('Режиссер:','<font color="#74b9fe"></br>Режисcер:</font>');
	str=str.replace('режиссер:','<font color="#74b9fe"></br>режисcер:</font>');
	str=str.replace('Режиссёр:','<font color="#74b9fe"></br>Режиссёр:</font>');
	str=str.replace('Режисер:','<font color="#74b9fe"></br>Режиссёр:</font>');
	str=str.replace('Перевод:','<font color="#74b9fe"></br>Перевод:</font>');
	str=str.replace('перевод:','<font color="#74b9fe"></br>перевод:</font>');
	str=str.replace('Создатель сериала:','<font color="#74b9fe"></br>Создатель сериала:</font>');
	str=str.replace('В ролях:','<font color="#74b9fe"></br>В ролях:</font>');
	str=str.replace('Описание:','<font color="#74b9fe"></br>Описание:</font>');
	str=str.replace('О фильме:','<font color="#74b9fe"></br>О фильме:</font>');
	str=str.replace('Качество:','<font color="#74b9fe"></br>Качество:</font>');
	str=str.replace('Видео:','<font color="#74b9fe"></br>Видео:</font>');
	str=str.replace('Формат:','<font color="#74b9fe"></br>Формат:</font>');
	str=str.replace('Релиз:','<font color="#74b9fe"></br>Формат:</font>');
	str=str.replace('Дополнительно:','<font color="#74b9fe"></br>Дополнительно:</font>');
	str=str.replace('Произведено:','<font color="#74b9fe"></br>Произведено:</font>');
	str=str.replace('Продолжительность серии:','<font color="#74b9fe"></br>Продолжительность серии:</font>');
	str=str.replace('Продолжительность:','<font color="#74b9fe"></br>Продолжительность:</font>');
	str=str.replace('Страна:','<font color="#74b9fe"></br>Страна:</font>');
	str=str.replace('Студия:','<font color="#74b9fe"></br>Студия:</font>');
	str=str.replace('Сценаристы:','<font color="#74b9fe"></br>Сценаристы:</font>');
	str=str.replace('Оператор:','<font color="#74b9fe"></br>Оператор:</font>');
	str=str.replace('Композитор:','<font color="#74b9fe"></br>Композитор:</font>');
	str=str.replace('Озвучание:','<font color="#74b9fe"></br>Озвучание:</font>');
	str=str.replace('Озвучивание:','<font color="#74b9fe"></br>Озвучивание:</font>');
	str=str.replace('Озвучка:','<font color="#74b9fe"></br>Озвучка:</font>');
	str=str.replace('Субтитры:','<font color="#74b9fe"></br>Субтитры:</font>');
	str=str.replace('Сюжет:','<font color="#74b9fe"></br>Сюжет:</font>');
	str=str.replace('Контейнер:','<font color="#74b9fe"></br>Контейнер:</font>');
	str=str.replace('Аудио:','<font color="#74b9fe"></br>Аудио:</font>');
	str=str.replace('Размер:','<font color="#74b9fe"></br>Размер:</font>');
	str=str.replace('Файлформат:','<font color="#74b9fe"></br>Файлформат:</font>');
	str=str.replace('Звук:','<font color="#74b9fe"></br>Звук:</font>');
	str=str.replace('IMDB:','<font color="#74b9fe"></br>IMDB:</font>');
	str=str.replace('КиноПоиск:','<font color="#74b9fe"></br>КиноПоиск:</font>');
	str=str.replace('P.S.','<font color="#74b9fe"></br>P.S.</font>');
	str=str.replace('Видео кодек:','<font color="#74b9fe"></br>Видео кодек:</font>');
	str=str.replace('Аудио кодек:','<font color="#74b9fe"></br>Аудио кодек:</font>');
	str=str.replace('Аудио Rus:','<font color="#74b9fe"></br>Аудио Rus:</font>');
	str=str.replace('Аудио Eng:','<font color="#74b9fe"></br>Аудио Eng:</font>');
	str=str.replace('Аудио #1:','<font color="#74b9fe"></br>Аудио #1:</font>');
	str=str.replace('Аудио #2:','<font color="#74b9fe"></br>Аудио #2:</font>');
	str=str.replace('Аудио #3:','<font color="#74b9fe"></br>Аудио #3:</font>');
	str=str.replace('Аудио #4:','<font color="#74b9fe"></br>Аудио #4:</font>');
	str=str.replace('Аудио #5:','<font color="#74b9fe"></br>Аудио #5:</font>');
	str=str.replace('Аудио№1:','<font color="#74b9fe"></br>Аудио№1:</font>');
	str=str.replace('Аудио№2:','<font color="#74b9fe"></br>Аудио№2:</font>');
	str=str.replace('Аудио№3:','<font color="#74b9fe"></br>Аудио№3:</font>');
	str=str.replace('Аудио№4:','<font color="#74b9fe"></br>Аудио№4:</font>');
	str=str.replace('Аудио№5:','<font color="#74b9fe"></br>Аудио№5:</font>');
	str=str.replace('Статей:','<font color="#74b9fe"></br>Статей:</font>');
	str=str.replace('смотреть онлайн','');
	if(this.mURL.toLowerCase().indexOf("ex.ua") >= 0){
		str = str.split('Отзывов')[0]
	}
	return str;
	
}

var TF = {
    MZ: function(a){
        a.reverse()
    },
    pw: function(a, b){
        var c = a[0];
        a[0] = a[b % a.length];
        a[b] = c
    },
    cO: function(a, b){
        a.splice(0, b)
    }
};
/*
function UF(a) {
    a = a.split("");
    TF.cO(a, 3);
    TF.MZ(a, 26);
    TF.pw(a, 23);
    TF.cO(a, 1);
    TF.pw(a, 19);
    TF.pw(a, 43);
    TF.pw(a, 36);
    return a.join("")
};*/
var YouTube_name=""
function YouTube_parse(URL){
	if (typeof YouSig == "undefined"){
		
		var js=XURL.GetPage("https://www.youtube.com/", "http://vk.com", "");
		var playerJs=XURL.trim(XURL.FindVal(js, 0, '"js":"', '"', false));
		playerJs=playerJs.replace(/\\\//g, '/');
		var code=XURL.GetPage("http:"+playerJs, "http://vk.com", "");
		var mat = code.match(/\.sig\|\|([a-zA-Z0-9$]+)\(/);
		var YouTube_name=mat[1]
		if (YouTube_name== null) {
			YouTube_name=mat[0]
		}	
		
		var name = code.match(new RegExp(";function "+YouTube_name+"(.*?){.*?};","g"));
		name = name[0].replace(";function", 'function');
		name = name.replace(YouTube_name, 'UF');
		
		var signame=name.match(/;(.*?[A-Za-z0-9]+)\./)
		
		var sic=signame[1]
		var sigc=code.match("var "+sic+"={.*?};")
		
		if(code!=""){
			var script = '<script type="text/javascript">var YouSig={}; '+name+sigc[0]+'</script>'
			
			$('head').append(script);
		}
	}
	URL=decodeURIComponent(URL)
	if(URL.indexOf("watch?v=") >= 0){
		URL = URL.split('watch?v=')[1]
	}else if(URL.indexOf("/v/") >= 0){
		URL = URL.split('/v/')[1]
	}else if (URL.indexOf('/embed/') >= 0){
		URL = URL.split('embed/')[1];
	}
	if (URL.indexOf('?') >= 0){
		URL = URL.substr(0, URL.indexOf('?'));
	}else if(URL.indexOf('#') >= 0){
		URL = URL.substr(0, URL.indexOf('#'));
	}
	var gParm = new Array('detailpage', 'vevo','embedded');
	var uURL="";
	for (var index in gParm){
		uURL = "http://www.youtube.com/get_video_info?video_id="+URL+"&eurl=&asv=3&sts=15956&el=" + gParm[index];
		//uURL=List.return_list(uURL);
		uURL=XURL.GetPage(uURL, "http://vk.com", "");
		if (uURL.indexOf('fmt_url_map') >= 0 || 
			uURL.indexOf('url_encoded_fmt_stream_map') >= 0 || 
			uURL.indexOf('adaptive_fmts') >= 0){
			break;
		}
	}
	
	var YouURL=parseQuery(uURL);
	var title="";
	var img="";
	if (YouURL.title){
		title = escape(YouURL.title);
	}
	if (YouURL.iurlmq){
		img=decodeURIComponent(escape(YouURL.iurlmq));
	}
	var fmt = YouURL.fmt_url_map;
    if(!fmt){
      fmt = YouURL.url_encoded_fmt_stream_map;
	}
	if(!fmt){
      fmt = YouURL.adaptive_fmts;
	}
    if(!fmt){
      return;
	}
	var list='{"youtube_video_api":[';
	if(fmt.search(/url=http/i) > -1){
		fmt = fmt.split(',');
		for(var i = 0; i < fmt.length; ++i){
			var p = parseQuery(fmt[i]);
			if(p.url){
				if(p.url.search(/(\?|&)sig(nature)?=/i) == -1 ||
					p.url.search(/(\?|&)s?=/i) == -1 ){
					if(p.sig){
						p.url += '&signature=' + encodeURIComponent(p.sig);
					}else if(p.signature){
						p.url += '&signature=' + encodeURIComponent(p.signature);
					}else if(p.s){
					try{
						var sing = p.s
						p.url.match(/&s=(.*?)(&|$)/)
						//p.url += '&signature=' + eval(YouTube_name(p.s));
						//p.url += '&signature=' + window[func](p.s)
						p.url += '&signature=' + UF(p.s);
						}catch(e){}
					}
				}
				if(p.url.search(/(\?|&)itag=/i) == -1){
					if(p.itag){
						p.url += '&ratebypass=yes&itag=' + encodeURIComponent(p.itag);
					}
				}
				p.url += '&title=' + title;
				var itag = p.url.match(/(?:\?|&)itag=(\d+)/i);
				if(itag && itag.length > 1){
					p.url = p.url.replace(/(\?|&)sig=/i, '$1signature=').replace(/\\u0026/ig, '&').replace(/\\\//g, '/');
					
					list+='{"title":"'+title.replace(/\+/g, ' ')+YouTube_type[p.itag][0]+'","image":"'+img+'","quality":"'+p.itag+'","video":"'+p.url+'"},'
				}
			}
		}
	}
	list=list+']}'
	list=list.replace('},]}', '}]}');
	return list;
}

XURL.MSG_ERROR = function(){
	//1 - Ничего не найдено!
	//2 - ПУСТО!
	//3 - Видео файл не найден.
	//4 - Ошибка сервера.
	//5 - Каталог пуст USB.
	//6 - USB-drive отсутствует или пуст
	if(XURL.error==1){
		var mode = "INFO";
		var txt=Widget_txt.msg_parse_1;
		var head = Widget_txt.window_mail;
		var color="#5b9b3b";
	}else if(XURL.error==2){
		var mode = "MSG_ERROR";
		var txt=Widget_txt.msg_parse_2+"</br></br>"+Widget_txt.msg_parse_msg;
		var head = Widget_txt.msg_error;
		var color="#9e0421";
	}else if(XURL.error==3){
		var mode = "MSG_ERROR";
		var txt=Widget_txt.msg_parse_3+"</br></br>"+Widget_txt.msg_parse_msg;
		var head = Widget_txt.msg_error;
		var color="#9e0421";
	}else if(XURL.error==4){
		var mode = "MSG_ERROR";
		var txt=Widget_txt.msg_parse_4+"</br></br>"+Widget_txt.msg_parse_msg;
		var head = Widget_txt.msg_error;
		var color="#9e0421";
	}else if(XURL.error==5){
		var mode = "INFO";
		var txt=Widget_txt.msg_parse_5;
		var head = Widget_txt.window_mail;
		var color="#9b3b93";
	}else if(XURL.error==6){
		var mode = "INFO";
		var txt=Widget_txt.msg_parse_6;
		var head = Widget_txt.window_mail;
		var color="#9b3b93";		
	}
	retNode = new returnNode();
	retNode.url = returnArray[returnArray.length-1].url;
	retNode.app = returnArray[returnArray.length-1].app;
	MSG_INFO(txt);
	return;
	var del = returnArray.pop();
	WINDOW.init(mode,"<center>"+txt+"</center>",head,"",color);
}

XURL.StartParser = function (url,mode,post,post_send){
	this.MODE_parser=mode;
	XURL.error=0;
	var open="";
	XURL.next_page_url="";
	XURL.next_page_app="";
	url = url + escape(Utf2Win(Main.search.replace(new RegExp(" ", 'gim'), "+")));
	this.fMode = true;
	console.log(url);
	XURL.Proceed(url);
}
