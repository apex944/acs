

<!--
function dis_swapImgRestore() { //v3.0
  var i,x,a=document.dis_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function dis_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.dis_p) d.dis_p=new Array();
    var i,j=d.dis_p.length,a=dis_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.dis_p[j]=new Image; d.dis_p[j++].src=a[i];}}
}

function dis_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=dis_findObj(n,d.layers[i].document); return x;
}

function dis_swapImage() { //v3.0
  var i,j=0,x,a=dis_swapImage.arguments; document.dis_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=dis_findObj(a[i]))!=null){document.dis_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function dis_timelineGoto(tmLnName, fNew, numGotos) { //v2.0
  //Copyright 1997 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,lastKeyFr,propNum,theObj;
  if (document.dis_Time == null) dis_initTimelines(); //if *very* 1st time
  tmLn = document.dis_Time[tmLnName];
  if (numGotos != null)
    if (tmLn.gotoCount == null) tmLn.gotoCount = 1;
    else if (tmLn.gotoCount++ >= numGotos) {tmLn.gotoCount=0; return}
  jmpFwd = (fNew > tmLn.curFrame);
  for (i = 0; i < tmLn.length; i++) {
    sprite = (jmpFwd)? tmLn[i] : tmLn[(tmLn.length-1)-i]; //count bkwds if jumping back
    if (sprite.charAt(0) == "s") {
      numKeyFr = sprite.keyFrames.length;
      firstKeyFr = sprite.keyFrames[0];
      lastKeyFr = sprite.keyFrames[numKeyFr - 1];
      if ((jmpFwd && fNew<firstKeyFr) || (!jmpFwd && lastKeyFr<fNew)) continue; //skip if untouchd
      for (keyFrm=1; keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]; keyFrm++);
      for (j=0; j<sprite.values.length; j++) {
        props = sprite.values[j];
        if (numKeyFr == props.length) propNum = keyFrm-1 //keyframes only
        else propNum = Math.min(Math.max(0,fNew-firstKeyFr),props.length-1); //or keep in legal range
        if (sprite.obj != null) {
          if (props.prop2 == null) sprite.obj[props.prop] = props[propNum];
          else        sprite.obj[props.prop2][props.prop] = props[propNum];
      } }
    } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
  }
  tmLn.curFrame = fNew;
  if (tmLn.ID == 0) eval('dis_timelinePlay(tmLnName)');
}

function dis_timelinePlay(tmLnName, myID) { //v1.2
  //Copyright 1997 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,propNum,theObj,firstTime=false;
  if (document.dis_Time == null) dis_initTimelines(); //if *very* 1st time
  tmLn = document.dis_Time[tmLnName];
  if (myID == null) { myID = ++tmLn.ID; firstTime=true;}//if new call, incr ID
  if (myID == tmLn.ID) { //if Im newest
    setTimeout('dis_timelinePlay("'+tmLnName+'",'+myID+')',tmLn.delay);
    fNew = ++tmLn.curFrame;
    for (i=0; i<tmLn.length; i++) {
      sprite = tmLn[i];
      if (sprite.charAt(0) == 's') {
        if (sprite.obj) {
          numKeyFr = sprite.keyFrames.length; firstKeyFr = sprite.keyFrames[0];
          if (fNew >= firstKeyFr && fNew <= sprite.keyFrames[numKeyFr-1]) {//in range
            keyFrm=1;
            for (j=0; j<sprite.values.length; j++) {
              props = sprite.values[j]; 
              if (numKeyFr != props.length) {
                if (props.prop2 == null) sprite.obj[props.prop] = props[fNew-firstKeyFr];
                else        sprite.obj[props.prop2][props.prop] = props[fNew-firstKeyFr];
              } else {
                while (keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]) keyFrm++;
                if (firstTime || fNew==sprite.keyFrames[keyFrm-1]) {
                  if (props.prop2 == null) sprite.obj[props.prop] = props[keyFrm-1];
                  else        sprite.obj[props.prop2][props.prop] = props[keyFrm-1];
        } } } } }
      } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
      if (fNew > tmLn.lastFrame) tmLn.ID = 0;
  } }
}

function dis_timelineStop(tmLnName) { //v1.2
  //Copyright 1997 Macromedia, Inc. All rights reserved.
  if (document.dis_Time == null) dis_initTimelines(); //if *very* 1st time
  if (tmLnName == null)  //stop all
    for (var i=0; i<document.dis_Time.length; i++) document.dis_Time[i].ID = null;
  else document.dis_Time[tmLnName].ID = null; //stop one
}

function dis_showHideLayers() { //v3.0
  var i,p,v,obj,args=dis_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=dis_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function dis_initTimelines() {
    //dis_initTimelines() Copyright 1997 Macromedia, Inc. All rights reserved.
    var ns = navigator.appName == "Netscape";
    document.dis_Time = new Array(8);
    document.dis_Time[0] = new Array(1);
    document.dis_Time["CT-time"] = document.dis_Time[0];
    document.dis_Time[0].dis_Name = "CT-time";
    document.dis_Time[0].fps = 15;
    document.dis_Time[0][0] = new String("behavior");
    document.dis_Time[0][0].frame = 10;
    document.dis_Time[0][0].value = "dis_showHideLayers('DropCT','','hide')";
    document.dis_Time[0].lastFrame = 10;
    
    document.dis_Time[1] = new Array(1);
    document.dis_Time["CH-time"] = document.dis_Time[1];
    document.dis_Time[1].dis_Name = "CH-time";
    document.dis_Time[1].fps = 15;
    document.dis_Time[1][0] = new String("behavior");
    document.dis_Time[1][0].frame = 10;
    document.dis_Time[1][0].value = "dis_showHideLayers('DropCH','','hide')";
    document.dis_Time[1].lastFrame = 10;
    
    document.dis_Time[2] = new Array(1);
    document.dis_Time["FF-time"] = document.dis_Time[2];
    document.dis_Time[2].dis_Name = "FF-time";
    document.dis_Time[2].fps = 15;
    document.dis_Time[2][0] = new String("behavior");
    document.dis_Time[2][0].frame = 10;
    document.dis_Time[2][0].value = "dis_showHideLayers('DropFF','','hide')";
    document.dis_Time[2].lastFrame = 10;
    
    document.dis_Time[3] = new Array(2);
    document.dis_Time["Fin-time"] = document.dis_Time[3];
    document.dis_Time[3].dis_Name = "Fin-time";
    document.dis_Time[3].fps = 15;
    document.dis_Time[3][0] = new String("behavior");
    document.dis_Time[3][0].frame = 10;
    document.dis_Time[3][0].value = "dis_showHideLayers('DropFin','','hide')";
    document.dis_Time[3][1] = new String("behavior");
    document.dis_Time[3][1].frame = 3;
    document.dis_Time[3][1].value = "dis_showHideLayers('DropSub1','','hide','DropSub2','','hide','DropFinSub3','','hide')";
    document.dis_Time[3].lastFrame = 10;
    
    document.dis_Time[4] = new Array(1);
    document.dis_Time["KE-time"] = document.dis_Time[4];
    document.dis_Time[4].dis_Name = "KE-time";
    document.dis_Time[4].fps = 15;
    document.dis_Time[4][0] = new String("behavior");
    document.dis_Time[4][0].frame = 10;
    document.dis_Time[4][0].value = "dis_showHideLayers('DropKE','','hide')";
    document.dis_Time[4].lastFrame = 10;
    
    document.dis_Time[5] = new Array(1);
    document.dis_Time["FB-time"] = document.dis_Time[5];
    document.dis_Time[5].dis_Name = "FB-time";
    document.dis_Time[5].fps = 15;
    document.dis_Time[5][0] = new String("behavior");
    document.dis_Time[5][0].frame = 10;
    document.dis_Time[5][0].value = "dis_showHideLayers('DropFB','','hide')";
    document.dis_Time[5].lastFrame = 10;
    
    document.dis_Time[6] = new Array(1);
    document.dis_Time["FinOnDelay1"] = document.dis_Time[6];
    document.dis_Time[6].dis_Name = "FinOnDelay1";
    document.dis_Time[6].fps = 15;
    document.dis_Time[6][0] = new String("behavior");
    document.dis_Time[6][0].frame = 5;
    document.dis_Time[6][0].value = "dis_showHideLayers('DropSub1','','show')";
    document.dis_Time[6].lastFrame = 5;
    
    document.dis_Time[7] = new Array(1);
    document.dis_Time["FinOnDelay2"] = document.dis_Time[7];
    document.dis_Time[7].dis_Name = "FinOnDelay2";
    document.dis_Time[7].fps = 15;
    document.dis_Time[7][0] = new String("behavior");
    document.dis_Time[7][0].frame = 5;
    document.dis_Time[7][0].value = "dis_showHideLayers('DropSub2','','show')";
    document.dis_Time[7].lastFrame = 5;
    

    
    for (i=0; i<document.dis_Time.length; i++) {
        document.dis_Time[i].ID = null;
        document.dis_Time[i].curFrame = 0;
        document.dis_Time[i].delay = 1000/document.dis_Time[i].fps;
    }
}

function dis_ct_findObject(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=dis_ct_findObject(n,d.layers[i].document); return x;
}

function dis_ct_showHide() { //v3.0
  var i,p,v,obj,args=dis_ct_showHide.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=dis_ct_findObject(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}
//-->

