package neki.processoseletivo.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ConverterData {

    public static String converter(Date date) {
        return new SimpleDateFormat("dd/MM/YYYY HH:mm:ss").format(date);
    }
}