package ee.silgrowth.riddleruckus;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(StorePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
