package com.albumplugin;

import android.content.Context;
import android.database.Cursor;
import android.media.ExifInterface;
import android.net.Uri;
import android.provider.MediaStore;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.PluginResult;
import org.apache.cordova.camera.ExifHelper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * This class echoes a string called from JavaScript.
 */
public class AlbumPlugin extends CordovaPlugin {

  private SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  private static byte[] KEY = null;
  static {
    try{
      KEY = "*&a*l^b*u)m#$@".getBytes("UTF-8");
    }catch (UnsupportedEncodingException e){

    }

  }


  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("fileInfo")) {
      String filePath = args.getString(0);
      //this.getFileInfo(filePath, callbackContext);
      if(filePath.endsWith("jpg") ||filePath.endsWith("jpeg")){
        this.queryPhotoItem(filePath,callbackContext);
      }else if(filePath.endsWith("mp4")){
        this.queryVideoItem(filePath,callbackContext);
      }else {
        return false;
      }
      return true;
    }else if (action.equals("deleteFile")) {
      String filePath = args.getString(0);
      File file = new File(filePath);
      if(file.exists()){
        file.delete();
      }
      PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "success");
      callbackContext.sendPluginResult(pluginResult);
      return true;
    }else if (action.equals("queryFileList")) {
      String albumId = args.getString(0);
      int offset = args.getInt(1);
      int limit = args.getInt(2);

      String year = args.getString(3);
      String month = args.getString(4);

      this.queryFileList(albumId,offset,limit,year,month,callbackContext);
      return true;
    }else if (action.equals("encrypt")) {
      String str = args.getString(0);
      String result = SecurityUtils.encryptWithRSA(KEY,str);
      PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
      callbackContext.sendPluginResult(pluginResult);
      return true;
    }else if (action.equals("decrypt")) {
      String str = args.getString(0);
      String result = SecurityUtils.decryptWithRSA(KEY,str);
      PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
      callbackContext.sendPluginResult(pluginResult);
      return true;
    }
    return false;
  }

  private void getFileInfo(String filePath, CallbackContext callbackContext)  throws JSONException{
    try{
      ExifInterface inFile = new ExifInterface(filePath);
      String aperture = inFile.getAttribute(ExifInterface.TAG_APERTURE);
      String datetime = inFile.getAttribute(ExifInterface.TAG_DATETIME);
      String exposureTime = inFile.getAttribute(ExifInterface.TAG_EXPOSURE_TIME);
      String flash = inFile.getAttribute(ExifInterface.TAG_FLASH);
      String focalLength = inFile.getAttribute(ExifInterface.TAG_FOCAL_LENGTH);
      String gpsAltitude = inFile.getAttribute(ExifInterface.TAG_GPS_ALTITUDE);
      String gpsAltitudeRef = inFile.getAttribute(ExifInterface.TAG_GPS_ALTITUDE_REF);
      String gpsDateStamp = inFile.getAttribute(ExifInterface.TAG_GPS_DATESTAMP);
      String gpsLatitude = inFile.getAttribute(ExifInterface.TAG_GPS_LATITUDE);
      String gpsLatitudeRef = inFile.getAttribute(ExifInterface.TAG_GPS_LATITUDE_REF);
      String gpsLongitude = inFile.getAttribute(ExifInterface.TAG_GPS_LONGITUDE);
      String gpsLongitudeRef = inFile.getAttribute(ExifInterface.TAG_GPS_LONGITUDE_REF);
      String gpsProcessingMethod = inFile.getAttribute(ExifInterface.TAG_GPS_PROCESSING_METHOD);
      String gpsTimestamp = inFile.getAttribute(ExifInterface.TAG_GPS_TIMESTAMP);
      String iso = inFile.getAttribute(ExifInterface.TAG_ISO);
      String make = inFile.getAttribute(ExifInterface.TAG_MAKE);
      String model = inFile.getAttribute(ExifInterface.TAG_MODEL);
      String orientation = inFile.getAttribute(ExifInterface.TAG_ORIENTATION);
      String whiteBalance = inFile.getAttribute(ExifInterface.TAG_WHITE_BALANCE);

      JSONObject result = new JSONObject();
      result.put("creationDate", new Date(datetime));
      result.put("latitude", Double.parseDouble(gpsLatitude));
      result.put("longitude",Double.parseDouble(gpsLongitude));
      PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
      callbackContext.sendPluginResult(pluginResult);
    }catch (IOException e) {
      e.printStackTrace();
    }

  }

  public void queryFileList(String albumId,int offset,int pageSize,String year,String month, CallbackContext callbackContext)
    throws JSONException {
    Context context = this.cordova.getActivity().getApplicationContext();
    // All columns here: https://developer.android.com/reference/android/provider/MediaStore.Images.ImageColumns.html,
    // https://developer.android.com/reference/android/provider/MediaStore.MediaColumns.html
    JSONObject columns = new JSONObject() {{
      put("int.id", MediaStore.Images.Media._ID);
      put("fileName", MediaStore.Images.ImageColumns.DISPLAY_NAME);
      put("int.width", MediaStore.Images.ImageColumns.WIDTH);
      put("int.height", MediaStore.Images.ImageColumns.HEIGHT);
      put("albumId", MediaStore.Images.ImageColumns.BUCKET_ID);
      put("date.creationDate", MediaStore.Images.ImageColumns.DATE_TAKEN);
      put("float.latitude", MediaStore.Images.ImageColumns.LATITUDE);
      put("float.longitude", MediaStore.Images.ImageColumns.LONGITUDE);
      put("nativeURL", MediaStore.MediaColumns.DATA); // will not be returned to javascript
    }};

    String order = MediaStore.Images.ImageColumns.DATE_TAKEN +" DESC LIMIT "+pageSize+" OFFSET "+offset;

    Date startDate = null;
    Date endDate = null;

    Calendar sd = Calendar.getInstance();

    if( year!= null && !"null".equals(year)){
      sd.set(Calendar.YEAR,Integer.parseInt(year));
      sd.set(Calendar.MONTH,0);
      sd.set(Calendar.DAY_OF_MONTH,1);

      sd.set(Calendar.HOUR_OF_DAY,0);
      sd.set(Calendar.MINUTE,0);
      sd.set(Calendar.SECOND,0);
      sd.set(Calendar.MILLISECOND,0);

      startDate = sd.getTime();
     /* sd.set(Calendar.HOUR_OF_DAY,23);
      sd.set(Calendar.MINUTE,59);
      sd.set(Calendar.SECOND,59);
      sd.set(Calendar.MILLISECOND,999);*/

      sd.set(Calendar.YEAR,Integer.parseInt(year)+1);
      endDate = sd.getTime();
    }else if(month != null && !"null".equals(month)){
      String[] dd = month.split("-");
      sd.set(Calendar.YEAR,Integer.parseInt(dd[0]));
      sd.set(Calendar.MONTH,Integer.parseInt(dd[1])-1);
      sd.set(Calendar.DAY_OF_MONTH,1);

      sd.set(Calendar.HOUR_OF_DAY,0);
      sd.set(Calendar.MINUTE,0);
      sd.set(Calendar.SECOND,0);
      sd.set(Calendar.MILLISECOND,0);
      startDate = sd.getTime();

      sd.set(Calendar.MONTH,Integer.parseInt(dd[1]));
     /* sd.set(Calendar.HOUR_OF_DAY,23);
      sd.set(Calendar.MINUTE,59);
      sd.set(Calendar.SECOND,59);
      sd.set(Calendar.MILLISECOND,999);*/
      endDate = sd.getTime();
    }

    List<String> argList = new ArrayList<String>();
    String where ="1=1 ";
    if(albumId != null) {
      where +=" AND "+  MediaStore.Images.ImageColumns.BUCKET_ID+"='"+albumId+"' ";
    }

    if(startDate != null){
      where +=" AND "+ MediaStore.Images.ImageColumns.DATE_TAKEN + ">=?";
      argList.add(startDate.getTime()+"");
    }
    if(endDate != null){
      where +=" AND "+  MediaStore.Images.ImageColumns.DATE_TAKEN + "<?";
      argList.add(endDate.getTime()+"");
    }

    String[] args = new String[argList.size()];
    argList.toArray(args);

    final ArrayList<JSONObject> queryResults = queryContentProvider(context,
      MediaStore.Images.Media.EXTERNAL_CONTENT_URI, columns, where, order,args);

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, new JSONArray(queryResults));
    callbackContext.sendPluginResult(pluginResult);

  }

  public void queryPhotoItem(String nativeURL, CallbackContext callbackContext)
    throws JSONException {
    Context context = this.cordova.getActivity().getApplicationContext();
    // All columns here: https://developer.android.com/reference/android/provider/MediaStore.Images.ImageColumns.html,
    // https://developer.android.com/reference/android/provider/MediaStore.MediaColumns.html
    JSONObject columns = new JSONObject() {{
      put("int.id", MediaStore.Images.Media._ID);
      put("fileName", MediaStore.Images.ImageColumns.DISPLAY_NAME);
      put("int.width", MediaStore.Images.ImageColumns.WIDTH);
      put("int.height", MediaStore.Images.ImageColumns.HEIGHT);
      put("albumId", MediaStore.Images.ImageColumns.BUCKET_ID);
      put("date.creationDate", MediaStore.Images.ImageColumns.DATE_TAKEN);
      put("float.latitude", MediaStore.Images.ImageColumns.LATITUDE);
      put("float.longitude", MediaStore.Images.ImageColumns.LONGITUDE);
      put("nativeURL", MediaStore.MediaColumns.DATA); // will not be returned to javascript
    }};

    final String sortOrder = MediaStore.Images.Media.DATE_TAKEN + " DESC";

    final ArrayList<JSONObject> queryResults = queryContentProvider(context,
      MediaStore.Images.Media.EXTERNAL_CONTENT_URI, columns, MediaStore.MediaColumns.DATA+"='"+nativeURL+"'",sortOrder,null);

    JSONObject result = queryResults.size() > 0? queryResults.get(0):null;;

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
    callbackContext.sendPluginResult(pluginResult);

  }

  public void queryVideoItem(String nativeURL, CallbackContext callbackContext)
          throws JSONException {
    Context context = this.cordova.getActivity().getApplicationContext();
    // All columns here: https://developer.android.com/reference/android/provider/MediaStore.Images.ImageColumns.html,
    // https://developer.android.com/reference/android/provider/MediaStore.MediaColumns.html
    JSONObject columns = new JSONObject() {{
      put("int.id", MediaStore.Video.Media._ID);
      put("fileName", MediaStore.Video.VideoColumns.DISPLAY_NAME);
      put("description", MediaStore.Video.VideoColumns.DESCRIPTION);
      put("int.width", MediaStore.Video.VideoColumns.RESOLUTION);
      put("int.duration", MediaStore.Video.VideoColumns.DURATION);
      put("albumId", MediaStore.Video.VideoColumns.BUCKET_ID);
      put("albumName", MediaStore.Video.VideoColumns.BUCKET_DISPLAY_NAME);
      put("date.creationDate", MediaStore.Video.VideoColumns.DATE_TAKEN);
      put("float.latitude", MediaStore.Video.VideoColumns.LATITUDE);
      put("float.longitude", MediaStore.Video.VideoColumns.LONGITUDE);
      put("nativeURL", MediaStore.MediaColumns.DATA); // will not be returned to javascript
    }};

    final String sortOrder = MediaStore.Images.Media.DATE_TAKEN + " DESC";

    final ArrayList<JSONObject> queryResults = queryContentProvider(context,
            MediaStore.Video.Media.EXTERNAL_CONTENT_URI, columns, MediaStore.MediaColumns.DATA+"='"+nativeURL+"'",sortOrder,null);

    JSONObject result = queryResults.size() > 0? queryResults.get(0):null;;

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
    callbackContext.sendPluginResult(pluginResult);

  }

  private ArrayList<JSONObject> queryContentProvider(Context context, Uri collection, JSONObject columns
    , String whereClause,String sortOrder,String[] args) throws JSONException {

    final ArrayList<String> columnNames = new ArrayList<String>();
    final ArrayList<String> columnValues = new ArrayList<String>();

    Iterator<String> iteratorFields = columns.keys();

    while (iteratorFields.hasNext()) {
      String column = iteratorFields.next();

      columnNames.add(column);
      columnValues.add("" + columns.getString(column));
    }

    final Cursor cursor = context.getContentResolver().query(
      collection,
      columnValues.toArray(new String[columns.length()]),
      whereClause, args, sortOrder);

    final ArrayList<JSONObject> buffer = new ArrayList<JSONObject>();

    if (cursor.moveToFirst()) {
      do {
        JSONObject item = new JSONObject();

        for (String column : columnNames) {
          int columnIndex = cursor.getColumnIndex(columns.get(column).toString());

          if (column.startsWith("int.")) {
            item.put(column.substring(4), cursor.getInt(columnIndex));
            if (column.substring(4).equals("width") && item.getInt("width") == 0) {
              System.err.println("cursor: " + cursor.getInt(columnIndex));
            }
          } else if (column.startsWith("float.")) {
            item.put(column.substring(6), cursor.getFloat(columnIndex));
          } else if (column.startsWith("date.")) {
            long intDate = cursor.getLong(columnIndex);
            Date date = new Date(intDate);
            SimpleDateFormat format0 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String time = format0.format(date.getTime());
            item.put(column.substring(5), time);
          } else {
            item.put(column, cursor.getString(columnIndex));
          }
        }
        buffer.add(item);

        // TODO: return partial result

      }
      while (cursor.moveToNext());
    }

    cursor.close();

    return buffer;

  }
}
