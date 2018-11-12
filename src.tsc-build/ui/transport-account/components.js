"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Util = __importStar(require("@src/util"));
const assets_1 = __importDefault(require("@src/main/assets"));
const moment_1 = __importDefault(require("moment"));
function ConsumptionItem(ps) {
    return (React.createElement(react_native_1.View, { style: [styles.consumptionContainer, ps.viewStyle] },
        ps.imageUri && React.createElement(react_native_1.Image, { source: ps.imageUri, style: [styles.consumptionImage, ps.imageStyle] }),
        React.createElement(react_native_1.View, { style: [styles.consumptionItem, ps.itemStyle] },
            React.createElement(react_native_1.Text, { style: [styles.consumptionTitle, ps.titleStyle] }, ps.title),
            React.createElement(react_native_1.Text, { style: [styles.consumptionTitle, { fontSize: 18 }, ps.moneyStyle] }, ps.money ? ps.money : 0))));
}
exports.ConsumptionItem = ConsumptionItem;
function ConsumptionDetailsItem(ps) {
    return (React.createElement(react_native_1.View, { style: [styles.consumptionContainer, ps.viewStyle] },
        React.createElement(react_native_1.View, { style: [styles.consumptionItem, ps.itemStyle] },
            React.createElement(react_native_1.Text, { style: [styles.consumptionTitle, ps.titleStyle] }, ps.title),
            React.createElement(react_native_1.Text, { style: [styles.consumptionTitle, { fontSize: 18 }, ps.sumStyle] }, ps.sum ? ps.sum : 0))));
}
exports.ConsumptionDetailsItem = ConsumptionDetailsItem;
function Description(ps) {
    return (React.createElement(react_native_1.View, { style: styles.descriptItem },
        React.createElement(react_native_1.Text, { style: [styles.descriptTitle, ps.titleStyle] }, ps.title),
        React.createElement(react_native_1.Text, { style: [styles.descriptTitle, { color: 'black' }, ps.contentStyle] }, ps.content)));
}
exports.Description = Description;
function DescriptionItem(ps) {
    function mkLine(lines, i) {
        return (React.createElement(react_native_1.View, { style: styles.flexDirectionRow, key: i }, lines.map((item, j) => {
            return (React.createElement(Description, Object.assign({ key: j }, item)));
        })));
    }
    return (React.createElement(react_native_1.View, { style: ps.lineStyle }, Util.splitEvery(2, ps.items).map(mkLine)));
}
exports.DescriptionItem = DescriptionItem;
function ListItem(props) {
    let imageUri;
    switch (props.kind) {
        case 1:
            imageUri = assets_1.default.chezhu.vehicle;
            break;
        case 2:
            imageUri = assets_1.default.chezhu.goods;
            break;
    }
    return (React.createElement(react_native_1.View, { style: { marginBottom: 10 } },
        React.createElement(ConsumptionItem, { imageUri: imageUri, title: props.title, money: props.total, imageStyle: styles.listItemImage, itemStyle: { borderBottomWidth: 0, height: 45 }, moneyStyle: { color: '#ea0000' } }),
        React.createElement(DescriptionItem, { items: [
                { title: '现金', content: props.cashier },
                { title: '消费', content: props.consumption },
                { title: '轮胎', content: props.tire },
                { title: '油卡', content: props.oilCard },
            ], lineStyle: styles.listItemLine })));
}
exports.ListItem = ListItem;
function RecordTextView(ps) {
    return (React.createElement(react_native_1.View, { style: [styles.flexDirectionRow, { alignItems: 'center' }, ps.style] },
        React.createElement(react_native_1.Image, { source: ps.imageUri, style: styles.recordViewImage }),
        React.createElement(react_native_1.Text, { style: [styles.redcordText, ps.textStyle] }, ps.text)));
}
exports.RecordTextView = RecordTextView;
function StatRecordView(model) {
    const date = moment_1.default(model.outBizDate).format('YYYY-MM-DD HH:mm');
    return (React.createElement(react_native_1.View, { style: styles.startRecordView },
        React.createElement(RecordTextView, { imageUri: assets_1.default.chezhu.enterprise, text: model.goodsStationName, style: styles.recordTitleView }),
        React.createElement(react_native_1.View, { style: styles.recoredCityView },
            React.createElement(RecordTextView, { imageUri: assets_1.default.chezhu.start_city, text: model.senderAddress, style: styles.recordCityItem }),
            React.createElement(RecordTextView, { imageUri: assets_1.default.chezhu.end_city, text: model.receiptAddress, style: styles.recordCityItem })),
        React.createElement(react_native_1.View, { style: styles.recordInfoView },
            React.createElement(RecordTextView, { imageUri: assets_1.default.chezhu.gray_vehicle, text: model.truckNo, style: { marginRight: 15 }, textStyle: styles.recordInfoText }),
            React.createElement(RecordTextView, { imageUri: assets_1.default.chezhu.gray_goods, text: model.goodsType + model.quantity + model.weightUnit, textStyle: styles.recordInfoText })),
        React.createElement(react_native_1.View, { style: [styles.recordTitleView, { justifyContent: 'space-between', padding: 8 }] },
            React.createElement(react_native_1.Text, { style: [styles.consumptionTitle, { fontSize: 14 }] }, date),
            React.createElement(react_native_1.Text, { style: styles.recordMoney }, model.money))));
}
exports.StatRecordView = StatRecordView;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    consumptionContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    consumptionImage: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        marginLeft: 15
    },
    consumptionTitle: {
        fontSize: 16,
        color: '#3c3c3c',
    },
    consumptionItem: {
        flex: 1,
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingRight: 15,
        marginLeft: 15
    },
    descriptTitle: {
        fontSize: 16,
        color: 'gray',
        marginRight: 10
    },
    descriptItem: {
        flexDirection: 'row',
        flex: 1,
        height: 35,
        alignItems: 'center',
    },
    listItemImage: {
        width: 25,
        height: 25,
        resizeMode: 'stretch'
    },
    listItemLine: {
        padding: 6,
        paddingLeft: 15,
        backgroundColor: '#f8f8f8'
    },
    redcordText: {
        marginLeft: 7,
        fontSize: 14,
        color: '#3c3c3c'
    },
    recordTitleView: {
        padding: 12,
        paddingLeft: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    recordViewImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    recoredCityView: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15
    },
    recordCityItem: {
        justifyContent: 'flex-start',
        flex: 1
    },
    recordInfoView: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15,
        paddingTop: 5
    },
    recordInfoText: {
        fontSize: 12,
        color: '#4b4b4b'
    },
    recordMoney: {
        color: '#ea0000',
        fontSize: 18
    },
    startRecordView: {
        backgroundColor: '#f8f8f9',
        marginBottom: 10
    }
});
